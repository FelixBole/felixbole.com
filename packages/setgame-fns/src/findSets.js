"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePossibleSets = exports.findSets = void 0;
const isSet_1 = require("./isSet");
/**
 * Helper to find possible sets in the current layed out
 * cards on the Game grid
 */
const findSets = (cards) => {
    const found = [];
    cards.forEach((cardX) => {
        cards.forEach((cardY) => {
            if (cardX === cardY)
                return;
            cards.forEach((cardZ) => {
                if (cardX === cardZ || cardY === cardZ)
                    return;
                if ((0, isSet_1.isSet)([cardX, cardY, cardZ]))
                    found.push([cardX, cardY, cardZ]);
            });
        });
    });
    const sorted = found.map((group) => group.sort());
    const filterMultiDim = (arr) => {
        const uniques = [];
        const itemsFound = {};
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
};
exports.findSets = findSets;
const updatePossibleSets = (game) => {
    const newPossibleSets = (0, exports.findSets)(game.currentLayout);
    game.possibleSets = newPossibleSets;
    game.setIsPossible = newPossibleSets.length !== 0;
    return game;
};
exports.updatePossibleSets = updatePossibleSets;
