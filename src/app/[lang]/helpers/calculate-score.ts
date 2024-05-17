import { SCORES } from '../components/spelling-game/SpellingGame.constants';
import { IGame } from '../components/spelling-game/SpellingGame.types';

const calculateScore = (game: IGame, letter: string) => {
  if (letter.length === 4) return SCORES.min;

  if (game.pangrams.includes(letter)) return SCORES.pangram;

  return letter.length;
};

export const calculateMaxScore = (game: IGame) => {
  let maxScore = 0;

  game.answers.forEach((answer) => (maxScore += calculateScore(game, answer)));

  return maxScore;
};

export default calculateScore;
