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

    // Without this, we get a MIME type check error loading js files
    if (process.env.NODE_ENV === "production")
        app.use(
            express.static(path.join(__dirname, "..", "..", "front", "dist"))
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
        const { name, password } = req.body;
        if (!name || !password)
            return res
                .status(400)
                .json({ error: "missing body information", body: req.body });

        try {
            await User.createUser(name, password);
        } catch (err) {
            if (err.message.includes("E11000 duplicate")) {
                return res.status(400).json({
                    error: "ERRDUPLICATENAME",
                    message: "User with this name already exists",
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
                success: true,
            });
        }

        const user = await User.findOne({ name: req.body.name });
        if (!user)
            return res
                .status(404)
                .json({ error: "ERRINVALIUSRNAME", message: "user not found" });

        const pwValid = await user.isPasswordValid(req.body.password);
        if (!pwValid) {
            return res.status(400).json({
                error: "ERRINVALIDPASSWORD",
                message: "invalid password",
            });
        }

        req.session.userId = user._id.toString();
        req.session.name = user.name;
        res.json({
            result: "OK",
            success: true,
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

    // Let react handle all routing for client
    if (process.env.NODE_ENV === "production")
        app.get("*", async (req, res) => {
            res.sendFile(
                path.join(__dirname, "..", "..", "front", "dist", "index.html")
            );
        });

    const server = createServer(app);
    const { map } = setupWebSocketServer(server, store);

    server.listen(PORT, function () {
        // eslint-disable-next-line no-console
        console.log("Listening on http://localhost:" + PORT);
    });

    return { app, server } as AppServer;
};
