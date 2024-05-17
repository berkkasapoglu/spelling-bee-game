'use client';

import { useEffect, useState } from 'react';
import AnswerList from '../answer-list/AnswerList';
import HiveCellContainer from '../hive-cell-container/HiveCellContainer';
import HiveCell from '../hive-cell/HiveCell';
import ProgressBar from '../progress-bar/ProgressBar';
import UserAnswerInput from '../user-answer-input/UserAnswerInput';
import hiveClasses from '../hive-cell-container/HiveCellContainer.module.scss';
import classes from '../../page.module.css';
import gameClasses from './SpellingGame.module.scss';
import { IGame } from './SpellingGame.types';
import { uniqueId } from 'lodash';
import { MIDDLE_LETTER_INDEX } from './SpellingGame.constants';
import Button from '@/components/ui/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import ResultModal from '../info-modal/ResultModal';
import Timer from '../timer/Timer';
import useGame from '@/hooks/useGame';
import LevelInfoModal from '../info-modal/LevelInfoModal';
import useInfoModalStore from '@/store/useInfoModalStore';
import { useDictionary } from '@/contexts/DictionaryProvider';
import InfoMessage from '@/components/ui/info-message/InfoMessage';

interface IProps {
  gameData: IGame;
}

function SpellingGame({ gameData }: IProps) {
  const dict = useDictionary();
  const [game, setGame] = useState<IGame>();
  const { toggleResultModal } = useInfoModalStore();
  const {
    time,
    score,
    onCellClick,
    onDelete,
    onChangeUserInput,
    onEnter,
    onShuffle,
    userInput,
    correctAnswers,
    info,
    setInfo,
  } = useGame({ game, setGame });

  useEffect(() => {
    setGame(gameData);
  }, [gameData]);

  useEffect(() => {
    if (time) return;

    toggleResultModal(true);
  }, [time, toggleResultModal]);

  const renderCellRow = (start: number, end: number) => {
    return game?.validLetters
      .slice(start, end)
      .map((letter, idx) => (
        <HiveCell
          key={uniqueId()}
          letter={letter}
          variant={start + idx === MIDDLE_LETTER_INDEX ? 'middle' : 'outer'}
          onClick={onCellClick}
        />
      ));
  };

  return (
    <>
      <ResultModal score={score} />
      <LevelInfoModal />

      {game && (
        <>
          <ProgressBar score={score} />
          <AnswerList list={correctAnswers} />

          <InfoMessage
            text={info?.message}
            onClose={() => setInfo(null)}
            variant={info?.success ? 'success' : 'info'}
          />
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

          <Timer time={time} />
          <div className={gameClasses.actionButtons}>
            <Button
              label={dict.actionButtons.reset}
              onClick={() => window.location.reload()}
            />
            <Button label={dict.actionButtons.delete} onClick={onDelete} />
            <Button
              label={<FontAwesomeIcon icon={faRotate} />}
              onClick={onShuffle}
            />
            <Button label={dict.actionButtons.enter} onClick={onEnter} />
          </div>
        </>
      )}
    </>
  );
}
export default SpellingGame;
