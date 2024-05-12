import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import classes from './IconButton.module.scss';

function IconButton(props: FontAwesomeIconProps) {
  return (
    <a className={classes.button}>
      <FontAwesomeIcon {...props} />
    </a>
  );
}
export default IconButton;
