import { drawCard } from "./drawCard";

/**
 * Generates a random layout on the game grid based on the deck
 */
export const generateLayout = (deck: string[], showCount: number) => {
    const useDeckLength = deck.length <= showCount;

    const layout = Array(useDeckLength ? deck.length : showCount)
			.fill(0)
			.map(() => drawCard(deck));

	return layout;
}

/**
 * Updates the layout when a set is validated
 */
export const updateLayoutOnValidSet = (deck: string[], layout: string[], set: string[]) => {
	set.map((cardId) => {
		if (deck.length > 0) {
			const card = drawCard(deck, true);
			layout.splice(layout.indexOf(cardId), 1, card);
		} else {
			layout.splice(layout.indexOf(cardId), 1);
		}
	})

	return layout;
}

/**
 * Updates the layout when the show count updates
 */
export const updateDeckAndLayoutOnShowCountChange = (deck: string[], layout: string[], showCount: number) => {
	if (showCount === 12) {
		if (layout.length === 15) {
			// Reapply last three to deck
			for (let i = 0; i < 3; i++) {
				deck.push(layout.pop()!);
			}
		} else if (layout.length === 18) {
			for (let i = 0; i < 6; i++) {
				deck.push(layout.pop()!);
			}
		}
	} else if (showCount === 15) {
		if (layout.length === 12) {
			// Get three more
			for (let i = 0; i < 3; i++) {
				layout.push(drawCard(deck, true));
			}
		} else if (layout.length === 18) {
			for (let i = 0; i < 3; i++) {
				deck.push(layout.pop()!);
			}
		}
	} else if (showCount === 18) {
		for (let i = 0; i < 3; i++) {
			layout.push(drawCard(deck, true));
		}
	}

	return { deck, layout };
}