import classes from './Backdrop.module.scss';

interface IProps {
  onClick: () => void;
}

function Backdrop({ onClick }: IProps) {
  return <div className={classes.container} onClick={onClick} />;
}
export default Backdrop;
