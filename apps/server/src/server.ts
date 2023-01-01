import express from "express";
import { IncomingMessage, Server, ServerResponse, createServer } from "http";
import crypto from "crypto";
import cors from "cors";
import { setupWebSocketServer } from "./websocket";
import { setupSessionParser } from "./session";
import { startNewGame } from "./setgame";

type AppServer = {
    app: express.Application;
    server: Server<typeof IncomingMessage, typeof ServerResponse>;
};

export const startServer = (port = 3040) => {
    const PORT = process.env.PORT || port;
    const app = express();

    const { sessionParser, store } = setupSessionParser();

    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(sessionParser);

    app.post("/login", function (req, res) {
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

    app.delete("/logout", function (request, response) {
        const ws = map.get(request.session.userId);

        request.session.destroy(function () {
            if (ws) ws.close();

            response.send({ result: "OK", message: "Session destroyed" });
        });
    });

    app.get("/set/newgame", async (req, res) => {
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
