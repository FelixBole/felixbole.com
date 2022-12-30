/**
 * Creates an array of all possible combinations of the 4
 * different card attributes, thus generating the full 81
 * cards deck of a game of Set
 */
export const generateDeck = () => {
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

    const deck = combinations(possible, 4, 4);
    return deck;
};
