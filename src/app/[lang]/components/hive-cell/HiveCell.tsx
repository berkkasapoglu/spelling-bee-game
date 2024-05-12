import classNames from 'classnames';
import classes from './HiveCell.module.scss';
import { HiveVariant } from './HiveCell.types';

interface IProps {
  variant?: HiveVariant;
  letter: string;
}

function HiveCell({ variant = 'outer', letter }: IProps) {
  return (
    <button className={classNames([classes.hex, classes[variant]])}>
      <p className={classes.letter}>{letter}</p>
    </button>
  );
}
export default HiveCell;
