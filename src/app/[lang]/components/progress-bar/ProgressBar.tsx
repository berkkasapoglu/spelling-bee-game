import classNames from 'classnames';
import classes from './ProgressBar.module.scss';
import { SCORE_PROGRESS_STOPS } from '../spelling-game/SpellingGame.constants';

interface IProps {
  score: number;
}

function ProgressBar({ score }: IProps) {
  const stops = SCORE_PROGRESS_STOPS.map((stop) => stop.value);

  const checkIsCurrentStop = (stop: number, idx: number) => {
    const nextStopScore = stops[idx + 1];

    if (!nextStopScore) return score >= stop;

    return score >= stop && score < nextStopScore;
  };

  const getCurrentStopIndex = () => {
    const currentStopIndex = SCORE_PROGRESS_STOPS.findIndex((stop, idx) =>
      checkIsCurrentStop(stop.value, idx)
    );

    return currentStopIndex;
  };

  const currentStopIndex = getCurrentStopIndex();
  const currentStop = SCORE_PROGRESS_STOPS[currentStopIndex];
  const nextStop = SCORE_PROGRESS_STOPS[currentStopIndex + 1];

  return (
    <div className={classes.container}>
      <div className={classes.info}>
        <h5 className={classes.infoStatus}>{currentStop.label}</h5>
        {nextStop && (
          <p className={classes.nextStep}>
            <strong>{nextStop.value - score} </strong>
            to {nextStop.label}
          </p>
        )}
      </div>
      <div className={classes.progress}>
        {stops.map((stop, idx) => (
          <div
            key={idx}
            className={classNames({
              [classes.stop]: true,
              [classes.done]: score >= stops[idx + 1],
              [classes.current]: checkIsCurrentStop(stop, idx),
            })}
          >
            {checkIsCurrentStop(stop, idx) && score}
          </div>
        ))}
      </div>
    </div>
  );
}
export default ProgressBar;
