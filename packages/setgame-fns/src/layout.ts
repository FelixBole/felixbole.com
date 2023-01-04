import { SetGame } from "./typings";
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
export const updateLayoutOnValidSet = (game: SetGame, set: string[]) => {
	const { deck } = game;

	const replaceCards: string[] = [];

	set.map((cardId) => {
		if (deck.length > 0) {
			if (game.showCount === 12) {
				const card = drawCard(deck, true);
				game.currentLayout.splice(game.currentLayout.indexOf(cardId), 1, card);
			} else {

				// Take last non selected card and place it where selected card was
				let currentLastCardIdx = game.currentLayout.length - 1;
				const getLastNonSelectedCard = (): string => {
					const lastCard = game.currentLayout[currentLastCardIdx];
					if (set.includes(lastCard) && !replaceCards.includes(lastCard)) {
						currentLastCardIdx--;
						return getLastNonSelectedCard();
					} else {
						return lastCard;
					}
				}
				const card = getLastNonSelectedCard();
				replaceCards.push(card);

				// Remove it first
				game.currentLayout.splice(game.currentLayout.indexOf(card), 1);
				game.currentLayout.splice(game.currentLayout.indexOf(cardId), 1, card);
			}
		} else {
			game.currentLayout.splice(game.currentLayout.indexOf(cardId), 1);
		}
	})

	if (game.showCount > 12) game.showCount -= 3;

	return game;
}

/**
 * Updates the layout when the show count updates
 */
export const updateDeckAndLayoutOnShowCountChange = (deck: string[], layout: string[], showCount: number) => {
	if (showCount === 15) {
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