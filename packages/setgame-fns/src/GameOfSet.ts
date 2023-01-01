import { Player } from './@types';

export class GameOfSet {
    deck: string[] = [];
    currentLayout: string[] = [];
    setIsPossible: boolean = false;
    possibleSets: string[][] = [[]];
    showCount: number = 12;
    lastValidPlayerID: string;
    lastInvalidPlayerID: string;
    lastSet: string[];
    startedAt: number;
    players: Player[];

    constructor() {
        this.showCount = 12;
        this.lastInvalidPlayerID = "";
        this.lastValidPlayerID = "";
        this.lastSet = [];
        this.players = [];
        this.startedAt = 0;
        this.generateDeck();
        this.generateLayout();
    }

    start() {
        this.startedAt = Date.now();
        return this;
    }

    reset() {
        this.showCount = 12;
        this.lastInvalidPlayerID = "";
        this.lastValidPlayerID = "";
        this.lastSet = [];
        this.generateDeck();
        this.generateLayout();
        return this.start();
    }

    generateDeck() {
        const possible = ["1", "2", "3"];
        const combinations = (arr: string[], min: number, max: number) => {
            const combination = (arr: string[], depth: number): string[] => {
                if (depth === 1) return arr;
                const result = combination(arr, depth - 1)?.flatMap((val: string) =>
                    arr.map((char) => val + char)
                );
                return arr.concat(result);
            };

            return combination(arr, max).filter((val) => val.length >= min);
        };

        this.deck = combinations(possible, 4, 4);
        return this.deck;
    }

    drawCard(removeFromDeck = true) {
        const rnd = Math.floor(Math.random() * this.deck.length);
        const card = this.deck[rnd];
        if (removeFromDeck) this.deck.splice(rnd, 1);
        return card;
    }

    findSets() {
        const cards = this.currentLayout;
        const found: string[][] = [];

        cards.forEach((cardX) => {
            cards.forEach((cardY) => {
                if (cardX === cardY) return;
                cards.forEach((cardZ) => {
                    if (cardX === cardZ || cardY === cardZ) return;
                    if (GameOfSet.isSet([cardX, cardY, cardZ])) found.push([cardX, cardY, cardZ]);
                });
            });
        });

        const sorted = found.map((group) => group.sort());
        const filterMultiDim = (arr: string[][]) => {
            const uniques: string[][] = [];
            const itemsFound: { [key: string]: boolean } = {};
            for (let i = 0, l = arr.length; i < l; i++) {
                const tmp = JSON.stringify(arr[i]);
                if (itemsFound[tmp]) {
                    continue;
                }
                uniques.push(arr[i]);
                itemsFound[tmp] = true;
            }

            return uniques;
        };

        const filtered = filterMultiDim(sorted);

        return filtered;
    }

    updatePossibleSets() {
        const newPossibleSets = this.findSets();
        this.possibleSets = newPossibleSets;
        this.setIsPossible = newPossibleSets.length !== 0;
        return this;
    }

    generateLayout() {
        const useDeckLength = this.deck.length <= this.showCount;

        this.currentLayout = Array(useDeckLength ? this.deck.length : this.showCount)
                .fill(0)
                .map(() => this.drawCard());

        this.updatePossibleSets();

        return this;
    }

    updateLayoutOnValidSet(set: string[]) {
        const replaceCards: string[] = [];

        set.map((cardId) => {
            if (this.deck.length > 0) {
                if (this.showCount === 12) {
                    const card = this.drawCard(true);
                    this.currentLayout.splice(this.currentLayout.indexOf(cardId), 1, card);
                } else {
                    // Take last non selected card and place it where selected card was
                    let currentLastCardIdx = this.currentLayout.length - 1;
                    const getLastNonSelectedCard = (): string => {
                        const lastCard = this.currentLayout[currentLastCardIdx];
                        if (set.includes(lastCard) && !replaceCards.includes(lastCard)) {
                            currentLastCardIdx--;
                            return getLastNonSelectedCard();
                        } else {
                            return lastCard;
                        }
                    }
                    const card = getLastNonSelectedCard();
                    replaceCards.push(card);

                    // Remove it first
                    this.currentLayout.splice(this.currentLayout.indexOf(card), 1);
                    this.currentLayout.splice(this.currentLayout.indexOf(cardId), 1, card);
                }
            } else {
                this.currentLayout.splice(this.currentLayout.indexOf(cardId), 1);
            }
        })

        if (this.showCount > 12) this.showCount -= 3;

        return this;
    }

    findPlayer(id: string) {
        return this.players.find((p) => p.uuid === id);
    }

    findPlayerIndex(id: string) {
        return this.players.findIndex((p) => p.uuid === id);
    }

    addPlayer(id: string, name: string) {
        if (!this.findPlayer(id)) {
            this.players.push({
                uuid: id,
                currentScore: 0,
                wins: 0,
                ready: false,
                requestShowMore: false,
                name,
            });

            return true;
        }

        return false;
    }

    removePlayer(id: string) {
        const idx = this.findPlayerIndex(id);
        if (idx === -1) return false;
        this.players.splice(idx, 1);
        return true;
    }

    setPlayerReady(id: string) {
        const idx = this.findPlayerIndex(id);
        if (idx === -1) return false;
        this.players[idx].ready = true;
        return true;
    }

    addSetToPlayerScore(id: string) {
        const idx = this.findPlayerIndex(id);
        if (idx === -1) return false;
        this.players[idx].currentScore += 1;
        this.lastValidPlayerID = this.players[idx].uuid;
        return true;
    }

    sortPlayersByScore() {
        this.players.sort((a, b) => b.currentScore - a.currentScore)
    }

    setPlayerWin() {
        this.sortPlayersByScore();
        this.players[0].wins++;
        return this;
    }

    allPlayersReady() {
        let allReady = true;
        this.players.forEach((p) => {
            if (!p.ready) allReady = false;
        });
        return allReady;
    }

    allPlayersRequestedShowMore() {
        let allRequested = true;
        this.players.forEach((p) => {
            if (!p.requestShowMore) allRequested = false;
        });
        return allRequested;
    }

    resetPlayersShowMoreRequest() {
        this.players.forEach((p) => {
            p.requestShowMore = false;
        })
    }

    isGameOver() {
        if (this.deck.length !== 0) return false;
        return this.findSets().length === 0;
    }

    updateShowCount(showCount: number) {
        if (showCount > 18) return;
        this.showCount = showCount;
        if (showCount === 15) {
            if (this.currentLayout.length === 12) {
                // Get three more
                for (let i = 0; i < 3; i++) {
                    this.currentLayout.push(this.drawCard(true));
                }
            } else if (this.currentLayout.length === 18) {
                for (let i = 0; i < 3; i++) {
                    this.deck.push(this.currentLayout.pop()!);
                }
            }
        } else if (showCount === 18) {
            for (let i = 0; i < 3; i++) {
                this.currentLayout.push(this.drawCard(true));
            }
        }

        this.updatePossibleSets();

        return this;
    }

    static isSet(cards: string[]) {
        const allSame = (arr: string[], index: number) => {
            return (
                arr[0][index] === arr[1][index] && arr[1][index] === arr[2][index]
            );
        };

        const allDifferent = (arr: string[], index: number) => {
            return (
                arr[0][index] !== arr[1][index] &&
                arr[1][index] !== arr[2][index] &&
                arr[0][index] !== arr[2][index]
            );
        };

        for (let i = 0; i < 4; i++) {
            if (!allSame(cards, i) && !allDifferent(cards, i)) return false;
        }

        return true;
    }
}