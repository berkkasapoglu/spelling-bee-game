import { CORRECT_ANSWER_TIME_GAIN } from '@/app/[lang]/components/spelling-game/SpellingGame.constants';
import {
  VALIDATION_REGEX,
  VALID_TURKISH_CHARS,
} from '@/app/[lang]/components/user-answer-input/UserAnswer.constants';
import calculateScore from '@/app/[lang]/helpers/calculate-score';
import shuffleGame from '@/app/[lang]/helpers/shuffle-game';
import { Dispatch, SetStateAction, useState } from 'react';
import useTimer from './useTimer';
import { IGame } from '@/app/[lang]/components/spelling-game/SpellingGame.types';

interface IParams {
  game?: IGame;
  setGame: Dispatch<SetStateAction<IGame | undefined>>;
}

function useGame({ game, setGame }: IParams) {
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  const { time, changeTime } = useTimer();

  const onEnter = () => {
    if (!game) return;

    setUserInput('');

    if (correctAnswers.includes(userInput)) return;

    if (!game.pangrams.includes(userInput) && !game.answers.includes(userInput))
      return;

    setCorrectAnswers([...correctAnswers, userInput]);

    const gainedScore = calculateScore(game, userInput);
    changeTime((prev) => prev + CORRECT_ANSWER_TIME_GAIN);
    setScore(score + gainedScore);
  };

  const onDelete = () => {
    setUserInput((prev) => prev.slice(0, prev.length - 1));
  };

  const onShuffle = () => {
    if (!game) return;

    const shuffledGame = shuffleGame(game);

    setGame(shuffledGame);
  };

  const onChangeUserInput = (key: string) => {
    if (key === 'Backspace') return onDelete();
    if (key === 'Enter') return onEnter();

    const regex = new RegExp(VALIDATION_REGEX);
    if (!regex.test(key)) return;

    const isValid =
      (key >= 'a' && key <= 'z') || VALID_TURKISH_CHARS.includes(key);

    if (!isValid) return;

    setUserInput((prev) => prev + key);
  };

  const onCellClick = (letter: string) => {
    setUserInput((prev) => prev + letter);
  };

  return {
    time,
    score,
    onChangeUserInput,
    onCellClick,
    onShuffle,
    onDelete,
    onEnter,
    userInput,
    correctAnswers,
  };
}
export default useGame;
