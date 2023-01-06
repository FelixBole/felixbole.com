export type Player = {
    uuid: string;
    mongoID?: string;
    currentScore: number;
    ready: boolean;
    requestShowMore: boolean;
    name: string;
    avatar?: string[][];
};

export type SetGame = {
    players: Player[];
    deck: string[];
    currentLayout: string[];
    setIsPossible: boolean;
    possibleSets: string[][];
    showCount: number;
    lastValidPlayerID: string;
    lastInvalidPlayerID: string;
    lastSet: string[];
    startedAt: number;
};

export interface ISetGame {
    players: Player[];
    deck: string[];
    currentLayout: string[];
    setIsPossible: boolean;
    possibleSets: string[][];
    showCount: number;
    lastValidPlayerID: string;
    lastInvalidPlayerID: string;
    lastSet: string[];
    startedAt: number;

    generateDeck: () => string[];
    drawCard: (removeFromDeck?: boolean) => string;
    findSets: () => string[][];
    updatePossibleSets: () => ISetGame;
    isGameOver: () => boolean;
    isSet: (cards: string[]) => boolean;
    generateLayout: (showCount: number) => ISetGame;
    updateLayoutOnValidSet: (set: string[]) => ISetGame;
    updateDeckAndLayoutOnShowCountChange: (showCount: number) => ISetGame;
    findPlayer: (id: string) => Player;
    findPlayerIndex: (id: string) => number;
    addPlayer: (id: string, name: string) => ISetGame;
    removePlayer: (id: string) => ISetGame;
    setPlayerReady: (id: string) => ISetGame;
    addSetToPlayerScore: (id: string) => ISetGame;
    sortPlayersByScore: () => ISetGame;
}