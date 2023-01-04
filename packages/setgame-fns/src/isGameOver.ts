import { SetGame } from './typings';
import { findSets } from './findSets';

export const isGameOver = (game: SetGame) => {
    if (game.deck.length !== 0) return false;

    return findSets(game.currentLayout).length === 0;
}