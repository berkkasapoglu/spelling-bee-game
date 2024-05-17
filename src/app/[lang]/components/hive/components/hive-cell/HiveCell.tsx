'use client';

import classNames from 'classnames';
import classes from './HiveCell.module.scss';
import { HiveVariant } from './HiveCell.types';

interface IProps {
  variant?: HiveVariant;
  letter: string;
  onClick?: (value: string) => void;
}

function HiveCell({ variant = 'outer', letter, onClick }: IProps) {
  return (
    <button
      onClick={() => onClick?.(letter)}
      className={classNames([classes.hex, classes[variant]])}
    >
      <p className={classes.letter}>{letter}</p>
    </button>
  );
}
export default HiveCell;
