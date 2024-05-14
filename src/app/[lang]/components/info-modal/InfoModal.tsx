import Modal from '@/components/ui/modal/Modal';
import useInfoModalStore from '@/store/useInfoModalStore';
import classes from './InfoModal.module.scss';
import { SCORE_PROGRESS_STOPS } from '../spelling-game/SpellingGame.constants';

function InfoModal() {
  const { visible, closeModal } = useInfoModalStore();

  return (
    <Modal visible={visible} onClose={closeModal} className={classes.modal}>
      <div className={classes.header}>
        <h4>Rankings</h4>
      </div>
      <div className={classes.body}>
        <ul>
          {SCORE_PROGRESS_STOPS.map((stop, idx) => (
            <li key={idx} className={classes.stopRow}>
              <h5>{stop.label}</h5>
              <span className={classes.score}>({stop.value})</span>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}
export default InfoModal;
