import useInfoModalStore from '@/store/useInfoModalStore';
import { SCORE_PROGRESS_STOPS } from '../spelling-game/SpellingGame.constants';
import InfoModal from './InfoModal';
import { useEffect } from 'react';

interface IProps {
  score: number;
}

function ResultModal({ score }: IProps) {
  const { resultModalVisible, toggleResultModal } = useInfoModalStore();

  useEffect(() => {
    const lastLevelScore = SCORE_PROGRESS_STOPS.at(-1)?.value;

    if (lastLevelScore && score >= lastLevelScore) toggleResultModal(true);
  }, [score, toggleResultModal]);

  const getResultLevel = () => {
    const level = SCORE_PROGRESS_STOPS.find((stop, idx) => {
      const nextValue = SCORE_PROGRESS_STOPS[idx + 1]?.value;
      if (!nextValue) return true;

      return score >= stop.value && score < nextValue;
    });

    return level;
  };

  return (
    <InfoModal
      visible={resultModalVisible}
      onClose={() => toggleResultModal(false)}
      title={`You are ${getResultLevel()?.label}`}
    >
      <div style={{ marginTop: 20, marginBottom: 10 }}>
        <h4>Your Score: {score}</h4>
      </div>
    </InfoModal>
  );
}
export default ResultModal;
