'use client';

import { useEffect, useState } from 'react';
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
import gameClasses from './SpellingGame.module.scss';
import { IGame } from './SpellingGame.types';
import { uniqueId } from 'lodash';
import { MIDDLE_LETTER_INDEX } from './SpellingGame.constants';
import calculateScore from '../../helpers/calculate-score';
import InfoModal from '../info-modal/InfoModal';
import Button from '@/components/ui/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import shuffleGame from '../../helpers/shuffle-game';

interface IProps {
  gameData: IGame;
}

function SpellingGame({ gameData }: IProps) {
  const [game, setGame] = useState<IGame>();
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    setGame(gameData);
  }, [gameData]);

  const handleCellClick = (letter: string) => {
    setUserInput((prev) => prev + letter);
  };

  const onEnter = () => {
    if (!game) return;

    setUserInput('');

    if (correctAnswers.includes(userInput)) return;

    if (!game.pangrams.includes(userInput) && !game.answers.includes(userInput))
      return;

    setCorrectAnswers([...correctAnswers, userInput]);

    const gainedScore = calculateScore(game, userInput);
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

  const renderCellRow = (start: number, end: number) => {
    return game?.validLetters
      .slice(start, end)
      .map((letter, idx) => (
        <HiveCell
          key={uniqueId()}
          letter={letter}
          variant={start + idx === MIDDLE_LETTER_INDEX ? 'middle' : 'outer'}
          onClick={handleCellClick}
        />
      ));
  };

  return (
    <>
      <InfoModal />
      {game && (
        <>
          <ProgressBar score={score} />
          <AnswerList list={correctAnswers} />
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

          <div className={gameClasses.actionButtons}>
            <Button label="Delete" onClick={onDelete} />
            <Button
              label={<FontAwesomeIcon icon={faRotate} />}
              onClick={onShuffle}
            />
            <Button label="Enter" onClick={onEnter} />
          </div>
        </>
      )}
    </>
  );
}
export default SpellingGame;
