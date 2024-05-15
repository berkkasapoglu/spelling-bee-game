import { useDictionary } from '@/contexts/DictionaryProvider';
import classes from './Timer.module.scss';

interface IProps {
  time: number;
}

function Timer({ time }: IProps) {
  const dict = useDictionary();

  return (
    <div className={classes.container}>
      <h1>{time}</h1>
      <p className={classes.label}>{dict.result.seconds}</p>
    </div>
  );
}
export default Timer;
