"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortPlayersByScore = exports.addSetToPlayerScore = exports.removePlayer = exports.setPlayerReady = exports.addPlayer = exports.findPlayerIndex = exports.findPlayer = void 0;
const findPlayer = (players, uuid) => {
    return players.find((p) => p.uuid === uuid);
};
exports.findPlayer = findPlayer;
const findPlayerIndex = (players, uuid) => {
    return players.findIndex((p) => p.uuid === uuid);
};
exports.findPlayerIndex = findPlayerIndex;
const addPlayer = (game, uuid, name) => {
    if (!(0, exports.findPlayer)(game.players, uuid)) {
        game.players.push({
            uuid,
            currentScore: 0,
            wins: 0,
            ready: false,
            requestShowMore: false,
            name,
        });
        return true;
    }
    return false;
};
exports.addPlayer = addPlayer;
const setPlayerReady = (players, uuid) => {
    const idx = (0, exports.findPlayerIndex)(players, uuid);
    if (idx === -1)
        return false;
    players[idx].ready = true;
    return true;
};
exports.setPlayerReady = setPlayerReady;
const removePlayer = (game, uuid) => {
    const idx = (0, exports.findPlayerIndex)(game.players, uuid);
    if (idx === -1)
        return false;
    game.players.splice(idx, 1);
    return true;
};
exports.removePlayer = removePlayer;
const addSetToPlayerScore = (game, uuid) => {
    const idx = (0, exports.findPlayerIndex)(game.players, uuid);
    if (idx === -1)
        return false;
    game.players[idx].currentScore += 1;
    game.lastValidPlayerID = game.players[idx].uuid;
    return true;
};
exports.addSetToPlayerScore = addSetToPlayerScore;
const sortPlayersByScore = (game) => {
    game.players.sort((a, b) => {
        return b.currentScore - a.currentScore;
    });
};
exports.sortPlayersByScore = sortPlayersByScore;
