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

export const updateLayoutOnShowCountChange = (deck: string[], currentLayout: string[], newShowCount: number) => {

}