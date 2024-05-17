import Button from '@/components/ui/button/Button';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './ActionButtons.module.scss';
import { useDictionary } from '@/contexts/DictionaryProvider';

interface IProps {
  onDelete: () => void;
  onShuffle: () => void;
  onEnter: () => void;
}

function ActionButtons({ onDelete, onShuffle, onEnter }: IProps) {
  const dict = useDictionary();

  return (
    <div className={classes.actionButtons}>
      <Button
        label={dict.actionButtons.reset}
        onClick={() => window.location.reload()}
      />
      <Button label={dict.actionButtons.delete} onClick={onDelete} />
      <Button label={<FontAwesomeIcon icon={faRotate} />} onClick={onShuffle} />
      <Button label={dict.actionButtons.enter} onClick={onEnter} />
    </div>
  );
}
export default ActionButtons;
