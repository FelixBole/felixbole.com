import { updateLayoutOnValidSet } from "setgame-fns";
import WebSocket, { WebSocketServer } from "ws";
import {
    addPlayer,
    addSetToPlayerScore,
    removePlayer,
    SetGame,
    setPlayerReady,
} from "./setgame";

export const playerJoined = (
    wss: WebSocketServer,
    game: SetGame,
    uuid: string,
    roomId: string,
    isBinary: boolean
) => {
    if (!addPlayer(game, uuid)) return;

    wss.clients?.forEach((client) => {
        if (client.readyState !== WebSocket.OPEN) return;
        client.send(
            JSON.stringify({
                eventName: "playerJoined",
                players: game.players,
                roomId,
            }),
            { binary: isBinary }
        );
    });
    return;
};

export const playerReady = (
    wss: WebSocketServer,
    game: SetGame,
    uuid: string,
    roomId: string,
    isBinary: boolean
) => {
    if (!setPlayerReady(game.players, uuid)) return;

    let allReady = true;
    game.players.forEach((p) => {
        if (!p.ready) allReady = false;
    });

    wss.clients?.forEach((client) => {
        if (client.readyState !== WebSocket.OPEN) return;
        client.send(
            JSON.stringify({
                eventName: allReady ? "gameStart" : "playerReady",
                players: game.players,
                roomId,
                game: allReady ? game : undefined,
            }),
            { binary: isBinary }
        );
    });

    return;
};

export const playerExit = (
    wss: WebSocketServer,
    game: SetGame,
    uuid: string,
    roomId: string,
    isBinary: boolean
) => {
    if (!removePlayer(game, uuid)) return;

    wss.clients?.forEach((client) => {
        if (client.readyState !== WebSocket.OPEN) return;
        client.send(
            JSON.stringify({
                eventName: "playerExit",
                players: game.players,
                roomId: roomId,
            }),
            { binary: isBinary }
        );
    });

    return;
};

export const foundSet = (
    wss: WebSocketServer,
    game: SetGame,
    selection: string[],
    uuid: string,
    roomId: string,
    isBinary: boolean
) => {
    updateLayoutOnValidSet(game.deck, game.currentLayout, selection);
    addSetToPlayerScore(game, uuid);

    wss.clients?.forEach((client) => {
        if (client.readyState !== WebSocket.OPEN) return;
        client.send(
            JSON.stringify({
                eventName: "foundSet",
                players: game.players,
                roomId,
                game,
                selection,
            }),
            { binary: isBinary }
        );
    });
};
