import classNames from 'classnames';
import classes from './HiveCellContainer.module.scss';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

function HiveCellContainer({ children, className }: IProps) {
  return (
    <div className={classNames([classes.container, className])}>{children}</div>
  );
}
export default HiveCellContainer;
