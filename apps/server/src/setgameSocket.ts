import { GameOfSet } from "setgame-fns";
import WebSocket from "ws";
import { User } from "./models/User";
import { restartGame } from "./setgame";
import { sendToAllClients, sendToSpecifiedClients } from "./websocket";

export interface SetGameSocketCallbackParams {
    clients: WebSocket[];
    game: GameOfSet;
    uuid: string;
    roomId: string;
    isBinary: boolean;
    selection?: string[];
    avatar?: string[][];
}

export const playerJoined = (
    { game, uuid, roomId, isBinary, avatar }: SetGameSocketCallbackParams,
    name: string
) => {
    if (!game.addPlayer(uuid, name, avatar)) return;

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

export const foundSet = async ({
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

    if (game.isGameOver()) {
        const users = await User.find({
            _id: { $in: game.players.map((p) => p.uuid) },
        });

        // We sorted so we know the first one is winner
        const winningPlayer = users[0];
        const isMultiplayer = game.players.length > 1;
        if (isMultiplayer) {
            winningPlayer.stats.wins.multiplayer++;
            users.forEach((p) => {
                const player = game.players.find(
                    (pl) => pl.uuid === p._id.toString()
                );
                const score = game.getPlayerScore(player);
                p.stats.gamesPlayed.multiplayer++;
                p.stats.highScore.multiplayer =
                    score > p.stats.highScore.multiplayer
                        ? score
                        : p.stats.highScore.multiplayer;
            });
        } else {
            winningPlayer.stats.wins.solo++;
            winningPlayer.stats.gamesPlayed.solo++;

            const curHiScore = winningPlayer.stats.highScore.solo;
            const newPotentialHiScore = game.getPlayerScore(game.players[0]);
            winningPlayer.stats.highScore.solo =
                newPotentialHiScore > curHiScore
                    ? newPotentialHiScore
                    : curHiScore;
        }

        await Promise.all(users.map((u) => u.save()));
    }

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
