"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDeck = void 0;
/**
 * Creates an array of all possible combinations of the 4
 * different card attributes, thus generating the full 81
 * cards deck of a game of Set
 */
const generateDeck = () => {
    const possible = ["1", "2", "3"];
    const combinations = (arr, min, max) => {
        const combination = (arr, depth) => {
            var _a;
            if (depth === 1)
                return arr;
            const result = (_a = combination(arr, depth - 1)) === null || _a === void 0 ? void 0 : _a.flatMap((val) => arr.map((char) => val + char));
            return arr.concat(result);
        };
        return combination(arr, max).filter((val) => val.length >= min);
    };
    const deck = combinations(possible, 4, 4);
    return deck;
};
exports.generateDeck = generateDeck;
