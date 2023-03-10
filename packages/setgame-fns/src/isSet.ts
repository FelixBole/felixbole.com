/**
 * Checks if a group of 3 cards forms a Set
 * Faster than preious
 */
export const isSet = (cards: string[]) => {
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
        // if (!allDifferent(cards, i)) return false;
    }

    return true;
};
