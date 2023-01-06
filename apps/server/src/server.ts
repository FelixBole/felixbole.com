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

    app.get("/api/auth/check", async (req, res) => {
        if (req.session.userId) {
            const user = await User.findById(req.session.userId);
            if (!user)
                return res.status(404).json({ error: "ERRUSERNOTFOUND" });
            return res.status(200).json({
                success: true,
                message: "User authenticated",
                data: { user: user.publicSchema() },
            });
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

        let user;

        try {
            user = await User.createUser(name, password);
        } catch (err) {
            if (err.message.includes("E11000 duplicate")) {
                return res.status(400).json({
                    error: "ERRDUPLICATENAME",
                    message: "User with this name already exists",
                });
            }
            return res.status(500).json({ error: "failed to create user" });
        }

        req.session.userId = user._id.toString();
        req.session.avatar = user.avatar;
        req.session.name = name;

        return res.status(201).json({
            message: "user created",
            success: true,
            statusCode: 201,
            user: user.publicSchema(),
        });
    });

    app.post("/api/login", async (req, res) => {
        const user = await User.findOne({ name: req.body.name });
        if (!user)
            return res
                .status(404)
                .json({ error: "ERRUSERNOTFOUND", message: "user not found" });

        const pwValid = await user.isPasswordValid(req.body.password);
        if (!pwValid) {
            return res.status(400).json({
                error: "ERRINVALIDPASSWORD",
                message: "invalid password",
            });
        }

        req.session.userId = user._id.toString();
        req.session.avatar = user.avatar;
        req.session.name = user.name;
        res.json({
            success: true,
            message: "Session updated",
            sid: req.session.userId,
            user: user.publicSchema(),
        });
    });

    app.delete("/api/logout", async (req, res) => {
        const ws = map.get(req.session.userId);

        req.session.destroy(function () {
            if (ws) ws.close();

            res.json({ result: "OK", message: "Session destroyed" });
        });
    });

    app.get("/api/set/newgame", async (req, res) => {
        const { newGame, roomId } = startNewGame();

        return res.json({ newGame, roomId });
    });

    if (process.env.NODE_ENV === "production") {
        // Without this, we get a MIME type check error loading js files
        app.use(
            express.static(path.join(__dirname, "..", "..", "front", "dist"))
        );

        // Let react handle all routing for client
        app.get("*", async (req, res) => {
            res.sendFile(
                path.join(__dirname, "..", "..", "front", "dist", "index.html")
            );
        });
    }

    const server = createServer(app);
    const { map } = setupWebSocketServer(server, store);

    server.listen(PORT, function () {
        // eslint-disable-next-line no-console
        console.log("Listening on http://localhost:" + PORT);
    });

    return { app, server } as AppServer;
};
