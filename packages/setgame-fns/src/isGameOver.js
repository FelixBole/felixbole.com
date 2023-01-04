"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGameOver = void 0;
const findSets_1 = require("./findSets");
const isGameOver = (game) => {
    if (game.deck.length !== 0)
        return false;
    return (0, findSets_1.findSets)(game.currentLayout).length === 0;
};
exports.isGameOver = isGameOver;
