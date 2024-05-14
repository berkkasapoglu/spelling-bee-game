import { createPortal } from 'react-dom';
import classes from './Modal.module.scss';
import Backdrop from '../backdrop/Backdrop';
import classNames from 'classnames';

interface IProps {
  children: React.ReactNode;
  visible: boolean;
  onClose?: () => void;
  backdrop?: boolean;
  className?: string;
}

function Modal({
  children,
  visible,
  onClose,
  className,
  backdrop = true,
}: IProps) {
  const handleBackdropClick = () => {
    onClose?.();
  };

  if (!visible) return;

  return createPortal(
    <>
      {backdrop && <Backdrop onClick={handleBackdropClick} />}
      <div className={classNames([classes.container, className])}>
        {children}
      </div>
    </>,
    document.body
  );
}
export default Modal;
