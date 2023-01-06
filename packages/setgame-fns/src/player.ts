import { Player, SetGame } from './typings';

export const findPlayer = (players: Player[], uuid: string) => {
    return players.find((p) => p.uuid === uuid);
};

export const findPlayerIndex = (players: Player[], uuid: string) => {
    return players.findIndex((p) => p.uuid === uuid);
};

export const addPlayer = (game: SetGame, uuid: string, name: string) => {
    if (!findPlayer(game.players, uuid)) {
        game.players.push({
            uuid,
            currentScore: 0,
            ready: false,
            requestShowMore: false,
            name,
        });

        return true;
    }

    return false;
};

export const setPlayerReady = (players: Player[], uuid: string) => {
    const idx = findPlayerIndex(players, uuid);
    if (idx === -1) return false;
    players[idx].ready = true;
    return true;
};

export const removePlayer = (game: SetGame, uuid: string) => {
    const idx = findPlayerIndex(game.players, uuid);
    if (idx === -1) return false;
    game.players.splice(idx, 1);
    return true;
};

export const addSetToPlayerScore = (game: SetGame, uuid: string) => {
    const idx = findPlayerIndex(game.players, uuid);
    if (idx === -1) return false;
    game.players[idx].currentScore += 1;
    game.lastValidPlayerID = game.players[idx].uuid;
    return true;
};

export const sortPlayersByScore = (game: SetGame) => {
    game.players.sort((a, b) => {
        return b.currentScore - a.currentScore;
    });
};
