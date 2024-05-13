'use client';

import { useState } from 'react';
import AnswerList from '../answer-list/AnswerList';
import HiveCellContainer from '../hive-cell-container/HiveCellContainer';
import HiveCell from '../hive-cell/HiveCell';
import ProgressBar from '../progress-bar/ProgressBar';
import {
  VALIDATION_REGEX,
  VALID_TURKISH_CHARS,
} from '../user-answer-input/UserAnswer.constants';
import UserAnswerInput from '../user-answer-input/UserAnswerInput';
import hiveClasses from '../hive-cell-container/HiveCellContainer.module.scss';
import classes from '../../page.module.css';
import { IGame } from './SpellingGame.types';
import { uniqueId } from 'lodash';

interface IProps {
  game: IGame;
}

function SpellingGame({ game }: IProps) {
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');

  const handleCellClick = (letter: string) => {
    setUserInput((prev) => prev + letter);
  };

  const onEnter = () => {
    if (correctAnswers.includes(userInput)) return;

    if (game.pangrams.includes(userInput)) {
      setCorrectAnswers([...correctAnswers, userInput]);
      return setScore((prev) => prev + 16);
    }

    if (game.answers.includes(userInput)) {
      setCorrectAnswers([...correctAnswers, userInput]);
      return setScore((prev) => prev + 10);
    }

    setUserInput('');
  };

  const onChangeUserInput = (key: string) => {
    if (key === 'Backspace')
      return setUserInput((prev) => prev.slice(0, prev.length - 1));

    if (key === 'Enter') return onEnter();

    const regex = new RegExp(VALIDATION_REGEX);
    if (!regex.test(key)) return;

    const isValid =
      (key >= 'a' && key <= 'z') || VALID_TURKISH_CHARS.includes(key);

    if (!isValid) return;

    setUserInput((prev) => prev + key);
  };

  const renderCellRow = (start: number, end: number) => {
    return game.validLetters
      .slice(start, end)
      .map((letter, idx) => (
        <HiveCell
          key={uniqueId()}
          letter={letter}
          variant={start + idx === 3 ? 'middle' : 'outer'}
          onClick={handleCellClick}
        />
      ));
  };

  return (
    <>
      <ProgressBar score={score} />
      <AnswerList />
      <UserAnswerInput
        value={userInput}
        onChange={onChangeUserInput}
        middleLetter={game.middleLetter}
      />
      <div className={classes.container}>
        <HiveCellContainer>{renderCellRow(0, 2)}</HiveCellContainer>
        <HiveCellContainer className={hiveClasses.middle}>
          {renderCellRow(2, 5)}
        </HiveCellContainer>
        <HiveCellContainer className={hiveClasses.last}>
          {renderCellRow(5, 7)}
        </HiveCellContainer>
      </div>
    </>
  );
}
export default SpellingGame;
