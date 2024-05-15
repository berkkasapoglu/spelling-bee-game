import useInfoModalStore from '@/store/useInfoModalStore';
import { SCORE_PROGRESS_STOPS } from '../spelling-game/SpellingGame.constants';
import InfoModal from './InfoModal';
import { useEffect } from 'react';
import { useDictionary } from '@/contexts/DictionaryProvider';
import classes from './InfoModal.module.scss';

interface IProps {
  score: number;
}

function ResultModal({ score }: IProps) {
  const dict = useDictionary();
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

  const getTitle = () => {
    const level = getResultLevel()?.label;

    if (!level) return '';

    return `${dict.result.lastResultTitle} ${dict.result.levels[level]}`;
  };

  return (
    <InfoModal
      visible={resultModalVisible}
      onClose={() => toggleResultModal(false)}
      title={getTitle()}
    >
      <div className={classes.resultBody}>
        <h4>
          {dict.result.score}: {score}
        </h4>
      </div>
    </InfoModal>
  );
}
export default ResultModal;
