"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawCard = void 0;
/**
 * Draws a card from the deck and removes it if option is specified
 */
const drawCard = (deck, removeFromDeck = true) => {
    const rnd = Math.floor(Math.random() * deck.length);
    const card = deck[rnd];
    if (removeFromDeck)
        deck.splice(rnd, 1);
    return card;
};
exports.drawCard = drawCard;
