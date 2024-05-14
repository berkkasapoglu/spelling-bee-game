import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import classes from './IconButton.module.scss';

function IconButton(props: FontAwesomeIconProps & { onClick: () => void }) {
  return (
    <button className={classes.button} onClick={props.onClick}>
      <FontAwesomeIcon {...props} />
    </button>
  );
}
export default IconButton;
