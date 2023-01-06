import { Request } from "express";
import { IncomingMessage, Server, ServerResponse } from "http";
import { WebSocket, WebSocketServer } from "ws";
import cookie from "cookie";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import { findGameByRoomId } from "./setgame";
import {
    foundSet,
    gameReset,
    invalidSet,
    playerExit,
    playerJoined,
    playerReady,
    requestShowMore,
    SetGameSocketCallbackParams,
} from "./setgameSocket";
import { GameOfSet } from "setgame-fns";

type WebSocketServerSetup = {
    wss: WebSocketServer;
    map: Map<string, WebSocket>;
};

interface ExtendedWebSocket extends WebSocket {
    isAlive?: boolean;
}

const userIDWSMap = new Map<string, WebSocket>();

export const setupWebSocketServer = (
    server: Server<typeof IncomingMessage, typeof ServerResponse>,
    store: MongoStore
) => {
    const wss = new WebSocketServer({ clientTracking: false, noServer: true });

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
        const name = req?.session?.name;

        if (!userId) return;

        // Check for broken connections
        (ws as ExtendedWebSocket).isAlive = true;
        ws.on("pong", heartbeat);

        userIDWSMap.set(userId, ws);

        ws.on("message", async function (rawData, isBinary) {
            const data = JSON.parse(rawData.toString());

            const game: GameOfSet | null = data.roomId
                ? findGameByRoomId(data.roomId)
                : null;

            if (!game) return;

            updateClientList(game);

            const callbackParams: SetGameSocketCallbackParams = {
                clients: game.players.map((p) => userIDWSMap.get(p.uuid)),
                uuid: userId,
                game,
                isBinary,
                roomId: data.roomId,
                selection: data.selection || [],
            };

            switch (data.eventName) {
                case "playerJoined":
                    return playerJoined(callbackParams, name);
                case "playerReady":
                    return playerReady(callbackParams);
                case "playerExit":
                    return playerExit(callbackParams);
                case "foundSet":
                    return await foundSet(callbackParams);
                case "showMore":
                    return requestShowMore(callbackParams);
                case "invalidSet":
                    return invalidSet(callbackParams);
                case "gameReset":
                    return gameReset(callbackParams);
                default:
                    break;
            }
        });

        ws.on("close", function () {
            userIDWSMap.delete(userId);
        });
    });

    // Set interval for ping to check broken connections
    const interval = setInterval(() => {
        // We're not tracking clients so we do this manually from the stored map
        userIDWSMap.forEach((ws) => {
            if ((ws as ExtendedWebSocket).isAlive === false)
                return ws.terminate();

            (ws as ExtendedWebSocket).isAlive = false;
            ws.ping();
        });
    }, 30000);

    wss.on("close", () => {
        clearInterval(interval);
    });

    return { wss, map: userIDWSMap } as WebSocketServerSetup;
};

export const updateClientList = (game: GameOfSet) => {
    for (const player of game.players) {
        const ws = userIDWSMap.get(player.uuid);
        if (!ws) userIDWSMap.delete(player.uuid);
    }
};

export const sendToAllClients = (message: string, isBinary: boolean) => {
    userIDWSMap.forEach((client) => {
        if (client.readyState !== WebSocket.OPEN) return;
        client.send(message, { binary: isBinary });
    });
};

export const sendToSpecifiedClients = (
    clients: WebSocket[],
    message: string,
    isBinary: boolean
) => {
    clients.forEach((client) => {
        if (!client) return;
        if (client.readyState !== WebSocket.OPEN) return;
        client.send(message, { binary: isBinary });
    });
};
