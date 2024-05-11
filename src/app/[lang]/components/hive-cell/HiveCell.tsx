import classNames from 'classnames';
import classes from './HiveCell.module.scss';

type HiveVariant = 'middle' | 'outer';

interface IProps {
  variant?: HiveVariant;
  letter: string;
}

function HiveCell({ variant = 'outer', letter }: IProps) {
  return (
    <div className={classNames([classes.hex, classes[variant]])}>
      <p className={classes.letter}>{letter}</p>
    </div>
  );
}
export default HiveCell;
