import Modal from '@/components/ui/modal/Modal';
import classes from './InfoModal.module.scss';

interface IProps {
  title: string;
  children?: React.ReactNode;
  onClose: () => void;
  visible: boolean;
}

function InfoModal({ title, children, visible, onClose }: IProps) {
  return (
    <Modal visible={visible} onClose={onClose} className={classes.modal}>
      <div className={classes.header}>
        <h4>{title}</h4>
      </div>
      <div className={classes.body}>{children}</div>
    </Modal>
  );
}
export default InfoModal;
