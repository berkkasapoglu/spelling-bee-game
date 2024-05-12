import classNames from 'classnames';
import classes from './ProgressBar.module.scss';

function ProgressBar() {
  return (
    <div className={classes.container}>
      <div className={classes.info}>
        <h5>Beginner</h5>
        <p className={classes.nextStep}>
          <strong>10 </strong>
          to Novice
        </p>
      </div>
      <div className={classes.progress}>
        <div className={classNames([classes.stop, classes.done])}></div>
        <div className={classNames([classes.stop, classes.done])}></div>
        <div className={classNames([classes.stop, classes.current])}>32</div>
        <div className={classes.stop}></div>
        <div className={classes.stop}></div>
        <div className={classes.stop}></div>
        <div className={classes.stop}></div>
        <div className={classes.stop}></div>
        <div className={classes.stop}></div>
      </div>
    </div>
  );
}
export default ProgressBar;
