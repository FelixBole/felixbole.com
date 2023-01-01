import crypto from "crypto";
import { GameOfSet } from "setgame-fns";

export const ONGOING_GAMES = new Map<string, GameOfSet>();

export const findGameByRoomId = (roomId: string) => {
    return ONGOING_GAMES.get(roomId);
};

export const startNewGame = () => {
    const roomId = crypto.randomUUID().split("-")[0];

    const newGame = new GameOfSet();

    ONGOING_GAMES.set(roomId, newGame);
    return { newGame, roomId };
};

export const restartGame = (game: GameOfSet) => {
    game.setPlayerWin();
    game.reset();
};

export const stopGame = (roomId: string) => {
    ONGOING_GAMES.delete(roomId);
};
