import classes from './Button.module.scss';

interface IProps {
  label?: string | React.ReactElement;
  onClick: () => void;
}

function Button({ label, onClick }: IProps) {
  return (
    <button onClick={onClick} className={classes.button}>
      {label}
    </button>
  );
}
export default Button;
