import { Request } from "express";
import { IncomingMessage, Server, ServerResponse } from "http";
import { WebSocket, WebSocketServer } from "ws";
import cookie from "cookie";
import cookieParser from "cookie-parser";
import { MemoryStore } from "express-session";
import {
    addPlayer,
    findGameByRoomId,
    findPlayer,
    findPlayerIndex,
    removePlayer,
    SetGame,
    setPlayerReady,
} from "./setgame";
import {
    foundSet,
    playerExit,
    playerJoined,
    playerReady,
} from "./setgameSocket";
import { updateLayoutOnValidSet } from "setgame-fns";

type WebSocketServerSetup = {
    wss: WebSocketServer;
    map: Map<string, WebSocket>;
};

interface ExtendedWebSocket extends WebSocket {
    isAlive?: boolean;
}

export const setupWebSocketServer = (
    server: Server<typeof IncomingMessage, typeof ServerResponse>,
    store: MemoryStore
) => {
    const map = new Map();
    const wss = new WebSocketServer({ clientTracking: true, noServer: true });

    // Serves to ping clients and check for broken connections
    function heartbeat() {
        this.isAlive = true;
    }

    server.on("upgrade", (request, socket, head) => {
        const req = request as Request;

        if (!request.headers.cookie) {
            socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
            socket.destroy();
            return;
        }

        // Manually recreate the session and get from the store
        const cookies = cookie.parse(request.headers.cookie);
        const sid = cookieParser.signedCookie(
            cookies["connect.sid"],
            process.env.SESSION_SECRET
        );

        if (!sid) {
            // eslint-disable-next-line no-console
            console.log("Missing sid: " + sid);
            return;
        }

        store.get(sid, (err, sessionData) => {
            if (err || !sessionData?.userId) {
                // eslint-disable-next-line no-console
                console.log(
                    "Tried to handle server upgrade but no session was found"
                );
                socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
                socket.destroy();
                return;
            }

            store.createSession(req, sessionData);
            wss.handleUpgrade(req, socket, head, (ws) => {
                wss.emit("connection", ws, req);
            });
        });
    });

    wss.on("connection", (ws, request) => {
        const req = request as Request;
        const userId = req?.session?.userId;

        if (!userId) return;

        // Check for broken connections
        (ws as ExtendedWebSocket).isAlive = true;
        ws.on("pong", heartbeat);

        map.set(userId, ws);

        ws.on("message", function (rawData, isBinary) {
            const data = JSON.parse(rawData.toString());

            const game: SetGame | null = data.roomId
                ? findGameByRoomId(data.roomId)
                : null;

            if (!game) return;

            if (data.eventName === "playerJoined") {
                return playerJoined(wss, game, userId, data.roomId, isBinary);
            } else if (data.eventName === "playerReady") {
                return playerReady(wss, game, userId, data.roomId, isBinary);
            } else if (data.eventName === "playerExit") {
                return playerExit(wss, game, userId, data.roomId, isBinary);
            } else if (data.eventName === "foundSet") {
                return foundSet(
                    wss,
                    game,
                    data?.selection || [],
                    userId,
                    data.roomId,
                    isBinary
                );
            }
        });

        ws.on("close", function () {
            map.delete(userId);
        });
    });

    // Set interval for ping to check broken connections
    const interval = setInterval(() => {
        if (!wss.clients) return;
        wss.clients.forEach((ws) => {
            if ((ws as ExtendedWebSocket).isAlive === false)
                return ws.terminate();

            (ws as ExtendedWebSocket).isAlive = false;
            ws.ping();
        });
    }, 30000);

    wss.on("close", () => {
        clearInterval(interval);
    });

    return { wss, map } as WebSocketServerSetup;
};
