import express from "express";
import path from "path";
import { IncomingMessage, Server, ServerResponse, createServer } from "http";
import crypto from "crypto";
import cors from "cors";
import { setupWebSocketServer } from "./websocket";
import { setupSessionParser } from "./session";
import { startNewGame } from "./setgame";
import { setupDB } from "./config/db";
import { User } from "./models/User";

type AppServer = {
    app: express.Application;
    server: Server<typeof IncomingMessage, typeof ServerResponse>;
};

export const startServer = (port = 3040) => {
    const PORT = process.env.PORT || port;

    setupDB();

    const app = express();

    const { sessionParser, store } = setupSessionParser();

    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(sessionParser);

    app.use(
        express.static(path.join(__dirname, "..", "..", "setgame", "dist"))
    );

    app.get("/api/auth/check", async (req, res) => {
        if (req.session.userId) {
            return res
                .status(200)
                .json({ success: true, message: "User authenticated" });
        }

        return res
            .status(401)
            .json({ success: false, error: "ERRUSERNOTLOGGEDIN" });
    });

    app.post("/api/signup", async (req, res) => {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res
                .status(400)
                .json({ error: "missing body information", body: req.body });

        try {
            await User.createUser(name, email, password);
        } catch (err) {
            if (err.message.includes("E11000 duplicate")) {
                return res.status(400).json({
                    error: "ERRDUPLICATEEMAIL",
                    message: "User with this email already exists",
                });
            }
            return res.status(500).json({ error: "failed to create user" });
        }

        const uuid = crypto.randomUUID();
        req.session.userId = uuid;
        req.session.name = name;

        return res.status(201).json({
            message: "user created",
            success: true,
            statusCode: 201,
            sid: uuid,
        });
    });

    app.post("/api/login", async (req, res) => {
        if (req.session.userId) {
            if (req?.body?.name !== req.session.name) {
                req.session.name = req.body.name;
            }

            return res.json({
                message: "Already connected ",
                sid: req.session.userId,
            });
        }

        const id = crypto.randomUUID();

        req.session.userId = id;
        req.session.name = req.body.name || "";
        res.json({
            result: "OK",
            message: "Session updated",
            sid: req.session.userId,
        });
    });

    app.delete("/api/logout", function (request, response) {
        const ws = map.get(request.session.userId);

        request.session.destroy(function () {
            if (ws) ws.close();

            response.send({ result: "OK", message: "Session destroyed" });
        });
    });

    app.get("/api/set/newgame", async (req, res) => {
        const { newGame, roomId } = startNewGame();

        return res.json({ newGame, roomId });
    });

    const server = createServer(app);
    const { map } = setupWebSocketServer(server, store);

    server.listen(PORT, function () {
        // eslint-disable-next-line no-console
        console.log("Listening on http://localhost:" + PORT);
    });

    return { app, server } as AppServer;
};
