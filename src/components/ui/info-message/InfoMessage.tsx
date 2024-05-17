import classNames from 'classnames';
import classes from './InfoMessage.module.scss';
import { useEffect } from 'react';

interface IProps {
  text?: string;
  variant: 'success' | 'info';
  onClose: () => void;
}

function InfoMessage({ variant, text, onClose }: IProps) {
  useEffect(() => {
    if (!text) return;

    setTimeout(() => {
      onClose();
    }, 1000);
  }, [text]);

  return (
    <div
      className={classNames([
        classes.container,
        classes[variant],
        { [classes.hidden]: !text },
      ])}
    >
      {text}
    </div>
  );
}
export default InfoMessage;
