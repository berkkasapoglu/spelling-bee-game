import useInfoModalStore from '@/store/useInfoModalStore';
import { SCORE_PROGRESS_STOPS } from '../spelling-game/SpellingGame.constants';
import InfoModal from './InfoModal';
import classes from './InfoModal.module.scss';

function LevelInfoModal() {
  const { levelInfoModalVisible, toggleLevelInfoModal } = useInfoModalStore();

  return (
    <InfoModal
      visible={levelInfoModalVisible}
      onClose={() => toggleLevelInfoModal(false)}
      title="Rankings"
    >
      <ul>
        {SCORE_PROGRESS_STOPS.map((stop, idx) => (
          <li key={idx} className={classes.stopRow}>
            <h5>{stop.label}</h5>
            <span className={classes.score}>({stop.value})</span>
          </li>
        ))}
      </ul>
    </InfoModal>
  );
}
export default LevelInfoModal;
