import classes from './Timer.module.scss';

interface IProps {
  time: number;
}

function Timer({ time }: IProps) {
  return (
    <div className={classes.container}>
      <h1>{time}</h1>
      <p className={classes.label}>seconds</p>
    </div>
  );
}
export default Timer;
