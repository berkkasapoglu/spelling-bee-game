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

interface IProps {
  games: IGame[];
}

function SpellingGame({ games }: IProps) {
  const [userInput, setUserInput] = useState('');

  const handleCellClick = (letter: string) => {
    setUserInput((prev) => prev + letter);
  };

  const onChangeUserInput = (key: string) => {
    if (key === 'Backspace')
      return setUserInput((prev) => prev.slice(0, prev.length - 1));

    const regex = new RegExp(VALIDATION_REGEX);
    if (!regex.test(key)) return;

    const isValid =
      (key >= 'a' && key <= 'z') || VALID_TURKISH_CHARS.includes(key);

    if (!isValid) return;

    setUserInput((prev) => prev + key);
  };

  return (
    <>
      <ProgressBar />
      <AnswerList />
      <UserAnswerInput
        value={userInput}
        onChange={onChangeUserInput}
        middleChar="D"
      />
      <div className={classes.container}>
        <HiveCellContainer>
          <HiveCell letter="T" onClick={handleCellClick} />
          <HiveCell letter="Y" onClick={handleCellClick} />
        </HiveCellContainer>
        <HiveCellContainer className={hiveClasses.middle}>
          <HiveCell letter="A" onClick={handleCellClick} />
          <HiveCell letter="D" variant="middle" onClick={handleCellClick} />
          <HiveCell letter="R" onClick={handleCellClick} />
        </HiveCellContainer>
        <HiveCellContainer className={hiveClasses.last}>
          <HiveCell letter="B" onClick={handleCellClick} />
          <HiveCell letter="T" onClick={handleCellClick} />
        </HiveCellContainer>
      </div>
    </>
  );
}
export default SpellingGame;
