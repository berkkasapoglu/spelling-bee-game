import { MIN_WORD_LENGTH } from '@/app/[lang]/components/spelling-game/SpellingGame.constants';
import { IGame } from '@/app/[lang]/components/spelling-game/SpellingGame.types';
import { Dictionary } from '@/contexts/DictionaryProvider';

interface IParams {
  userInput: string;
  correctAnswers: string[];
  game: IGame;
}

export interface IWarningMessage {
  message: string;
  success: boolean;
}

const validateInput = (
  { userInput, correctAnswers, game }: IParams,
  dict: Dictionary
): IWarningMessage => {
  if (userInput.length < MIN_WORD_LENGTH)
    return { message: dict.warning.tooShort, success: false };

  if (correctAnswers.includes(userInput))
    return { message: dict.warning.alreadyFound, success: false };

  if (!game.pangrams.includes(userInput) && !game.answers.includes(userInput))
    return { message: dict.warning.invalidWord, success: false };

  if (game.pangrams.includes(userInput))
    return { message: dict.warning.success.pangram, success: true };

  return { message: dict.warning.success.default, success: true };
};

export default validateInput;
