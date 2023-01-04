"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDeckAndLayoutOnShowCountChange = exports.updateLayoutOnValidSet = exports.generateLayout = void 0;
const drawCard_1 = require("./drawCard");
/**
 * Generates a random layout on the game grid based on the deck
 */
const generateLayout = (deck, showCount) => {
    const useDeckLength = deck.length <= showCount;
    const layout = Array(useDeckLength ? deck.length : showCount)
        .fill(0)
        .map(() => (0, drawCard_1.drawCard)(deck));
    return layout;
};
exports.generateLayout = generateLayout;
/**
 * Updates the layout when a set is validated
 */
const updateLayoutOnValidSet = (game, set) => {
    const { deck } = game;
    const replaceCards = [];
    set.map((cardId) => {
        if (deck.length > 0) {
            if (game.showCount === 12) {
                const card = (0, drawCard_1.drawCard)(deck, true);
                game.currentLayout.splice(game.currentLayout.indexOf(cardId), 1, card);
            }
            else {
                // Take last non selected card and place it where selected card was
                let currentLastCardIdx = game.currentLayout.length - 1;
                const getLastNonSelectedCard = () => {
                    const lastCard = game.currentLayout[currentLastCardIdx];
                    if (set.includes(lastCard) && !replaceCards.includes(lastCard)) {
                        currentLastCardIdx--;
                        return getLastNonSelectedCard();
                    }
                    else {
                        return lastCard;
                    }
                };
                const card = getLastNonSelectedCard();
                replaceCards.push(card);
                // Remove it first
                game.currentLayout.splice(game.currentLayout.indexOf(card), 1);
                game.currentLayout.splice(game.currentLayout.indexOf(cardId), 1, card);
            }
        }
        else {
            game.currentLayout.splice(game.currentLayout.indexOf(cardId), 1);
        }
    });
    if (game.showCount > 12)
        game.showCount -= 3;
    return game;
};
exports.updateLayoutOnValidSet = updateLayoutOnValidSet;
/**
 * Updates the layout when the show count updates
 */
const updateDeckAndLayoutOnShowCountChange = (deck, layout, showCount) => {
    if (showCount === 15) {
        if (layout.length === 12) {
            // Get three more
            for (let i = 0; i < 3; i++) {
                layout.push((0, drawCard_1.drawCard)(deck, true));
            }
        }
        else if (layout.length === 18) {
            for (let i = 0; i < 3; i++) {
                deck.push(layout.pop());
            }
        }
    }
    else if (showCount === 18) {
        for (let i = 0; i < 3; i++) {
            layout.push((0, drawCard_1.drawCard)(deck, true));
        }
    }
    return { deck, layout };
};
exports.updateDeckAndLayoutOnShowCountChange = updateDeckAndLayoutOnShowCountChange;
