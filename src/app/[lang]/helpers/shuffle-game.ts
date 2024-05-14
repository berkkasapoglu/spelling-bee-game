import { shuffle } from 'lodash';
import { MIDDLE_LETTER_INDEX } from '../components/spelling-game/SpellingGame.constants';
import { IGame } from '../components/spelling-game/SpellingGame.types';

const shuffleGame = (game: IGame): IGame => {
  const outerLetters = game.validLetters.filter(
    (letter) => letter !== game.middleLetter
  );

  const shuffledLetters = shuffle(outerLetters);

  shuffledLetters.splice(MIDDLE_LETTER_INDEX, 0, game.middleLetter);

  return { ...game, validLetters: shuffledLetters };
};

export default shuffleGame;
