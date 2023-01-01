import { GameOfSet } from "setgame-fns";
import WebSocket from "ws";
import { restartGame } from "./setgame";
import { sendToAllClients, sendToSpecifiedClients } from "./websocket";

export interface SetGameSocketCallbackParams {
    clients: WebSocket[];
    game: GameOfSet;
    uuid: string;
    roomId: string;
    isBinary: boolean;
    selection?: string[];
}

export const playerJoined = (
    { game, uuid, roomId, isBinary }: SetGameSocketCallbackParams,
    name: string
) => {
    if (!game.addPlayer(uuid, name)) return;

    const message = JSON.stringify({
        eventName: "playerJoined",
        players: game.players,
        roomId,
    });

    return sendToAllClients(message, isBinary);
};

export const playerReady = ({
    clients,
    game,
    uuid,
    roomId,
    isBinary,
}: SetGameSocketCallbackParams) => {
    if (!game.setPlayerReady(uuid)) return;

    const message = JSON.stringify({
        eventName: game.allPlayersReady() ? "gameStart" : "playerReady",
        players: game.players,
        roomId,
        game: game,
    });

    return sendToSpecifiedClients(clients, message, isBinary);
};

export const playerExit = ({
    clients,
    game,
    uuid,
    roomId,
    isBinary,
}: SetGameSocketCallbackParams) => {
    if (!game.removePlayer(uuid)) return;

    const message = JSON.stringify({
        eventName: "playerExit",
        players: game.players,
        roomId: roomId,
    });

    return sendToSpecifiedClients(clients, message, isBinary);
};

export const foundSet = ({
    clients,
    game,
    uuid,
    roomId,
    selection,
    isBinary,
}: SetGameSocketCallbackParams) => {
    game.updateLayoutOnValidSet(selection);
    game.updatePossibleSets();
    game.addSetToPlayerScore(uuid);

    // Reset player show more requests
    game.resetPlayersShowMoreRequest();

    game.lastSet = selection;
    game.sortPlayersByScore();

    const eventName = game.isGameOver() ? "gameOver" : "foundSet";

    const message = JSON.stringify({
        eventName: eventName,
        players: game.players,
        roomId,
        game,
        selection,
    });

    return sendToSpecifiedClients(clients, message, isBinary);
};

export const requestShowMore = ({
    clients,
    game,
    uuid,
    roomId,
    isBinary,
}: SetGameSocketCallbackParams) => {
    const idx = game.findPlayerIndex(uuid);
    if (idx === -1) return false;
    game.players[idx].requestShowMore = true;

    if (game.allPlayersRequestedShowMore()) {
        game.resetPlayersShowMoreRequest();
        game.updateShowCount(game.showCount + 3);
    }

    const eventName = game.isGameOver() ? "gameOver" : "showMore";

    const message = JSON.stringify({
        eventName: eventName,
        players: game.players,
        roomId,
        game,
    });

    return sendToSpecifiedClients(clients, message, isBinary);
};

export const invalidSet = ({
    clients,
    game,
    uuid,
    roomId,
    isBinary,
}: SetGameSocketCallbackParams) => {
    const idx = game.findPlayerIndex(uuid);
    if (idx === -1) return;

    game.lastInvalidPlayerID = game.players[idx].uuid;

    if (game.players[idx].currentScore > 0) {
        game.players[idx].currentScore--;
    }

    game.sortPlayersByScore();

    const message = JSON.stringify({
        eventName: "invalidSet",
        players: game.players,
        roomId,
        game,
        player: game.players[idx],
    });

    return sendToSpecifiedClients(clients, message, isBinary);
};

export const gameReset = ({
    clients,
    game,
    roomId,
    isBinary,
}: SetGameSocketCallbackParams) => {
    restartGame(game);

    const message = JSON.stringify({
        eventName: "gameRestart",
        players: game.players,
        roomId,
        game,
    });

    return sendToSpecifiedClients(clients, message, isBinary);
};
