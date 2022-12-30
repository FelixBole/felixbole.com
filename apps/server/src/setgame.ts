import crypto from "crypto";
import { findSets, generateDeck, generateLayout } from "setgame-fns";

export type Player = {
    uuid: string;
    wins: number;
    currentScore: number;
    ready: boolean;
};

export type SetGame = {
    players: Player[];
    deck: string[];
    currentLayout: string[];
    setIsPossible: boolean;
    possibleSets: string[][];
    showCount: number;
};

export const ONGOING_GAMES = new Map<string, SetGame>();

export const findGameByRoomId = (roomId: string) => {
    return ONGOING_GAMES.get(roomId);
};

export const startNewGame = (players: Player[]) => {
    const roomId = crypto.randomUUID();
    const deck = generateDeck();
    const showCount = 12;
    const currentLayout = generateLayout(deck, showCount);
    const possibleSets = findSets(currentLayout);
    const newGame: SetGame = {
        players,
        deck,
        currentLayout,
        setIsPossible: possibleSets.length > 0,
        possibleSets,
        showCount,
    };

    ONGOING_GAMES.set(roomId, newGame);
    return { newGame, roomId };
};

export const stopGame = (roomId: string) => {
    ONGOING_GAMES.delete(roomId);
};

export const findPlayer = (players: Player[], uuid: string) => {
    return players.find((p) => p.uuid === uuid);
};

export const findPlayerIndex = (players: Player[], uuid: string) => {
    return players.findIndex((p) => p.uuid === uuid);
};

export const addPlayer = (game: SetGame, uuid: string) => {
    if (!findPlayer(game.players, uuid)) {
        game.players.push({
            uuid,
            currentScore: 0,
            wins: 0,
            ready: false,
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
    return true;
};
