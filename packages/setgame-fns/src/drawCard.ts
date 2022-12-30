/**
 * Draws a card from the deck and removes it if option is specified
 */
export const drawCard = (deck: string[], removeFromDeck = true) => {
    const rnd = Math.floor(Math.random() * deck.length);
	const card = deck[rnd];
	if (removeFromDeck) deck.splice(rnd, 1);
	return card;
}