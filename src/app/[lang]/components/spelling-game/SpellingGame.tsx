'use client';

import { useEffect, useState } from 'react';
import AnswerList from '../answer-list/AnswerList';
import ProgressBar from '../progress-bar/ProgressBar';
import UserAnswerInput from '../user-answer-input/UserAnswerInput';
import { IGame } from './SpellingGame.types';
import ResultModal from '../info-modal/ResultModal';
import Timer from '../timer/Timer';
import useGame from '@/hooks/useGame';
import LevelInfoModal from '../info-modal/LevelInfoModal';
import useInfoModalStore from '@/store/useInfoModalStore';
import InfoMessage from '@/components/ui/info-message/InfoMessage';
import ActionButtons from '../action-buttons/ActionButtons';
import Hive from '../hive/Hive';
import { calculateMaxScore } from '../../helpers/calculate-score';

interface IProps {
  gameData: IGame;
}

function SpellingGame({ gameData }: IProps) {
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

  if (!game) return;

  return (
    <>
      <LevelInfoModal />
      <ResultModal score={score} maxScore={calculateMaxScore(game)} />

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

      <Hive validLetters={game.validLetters} onCellClick={onCellClick} />

      <Timer time={time} />
      <ActionButtons
        onDelete={onDelete}
        onEnter={onEnter}
        onShuffle={onShuffle}
      />
    </>
  );
}
export default SpellingGame;
