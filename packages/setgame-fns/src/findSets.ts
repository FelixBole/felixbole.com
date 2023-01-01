import { isSet } from "./isSet";
import { SetGame } from "./@types";

/**
 * Helper to find possible sets in the current layed out
 * cards on the Game grid
 */
export const findSets = (cards: string[]) => {
	const found: string[][] = [];

	cards.forEach((cardX) => {
		cards.forEach((cardY) => {
			if (cardX === cardY) return;
			cards.forEach((cardZ) => {
				if (cardX === cardZ || cardY === cardZ) return;
				if (isSet([cardX, cardY, cardZ])) found.push([cardX, cardY, cardZ]);
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
};

export const updatePossibleSets = (game: SetGame) => {
    const newPossibleSets = findSets(game.currentLayout);
    game.possibleSets = newPossibleSets;
    game.setIsPossible = newPossibleSets.length !== 0;
    return game;
};