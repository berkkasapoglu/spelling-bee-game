import HiveCellContainer from './components/hive-cell-container/HiveCellContainer';
import classes from './Hive.module.scss';
import hiveCellClasses from './components/hive-cell-container/HiveCellContainer.module.scss';
import HiveCell from './components/hive-cell/HiveCell';
import { uniqueId } from 'lodash';
import { MIDDLE_LETTER_INDEX } from '../spelling-game/SpellingGame.constants';

interface IProps {
  validLetters: string[];
  onCellClick: (letter: string) => void;
}

function Hive({ validLetters, onCellClick }: IProps) {
  const renderCellRow = (start: number, end: number) => {
    return validLetters
      .slice(start, end)
      .map((letter, idx) => (
        <HiveCell
          key={uniqueId()}
          letter={letter}
          variant={start + idx === MIDDLE_LETTER_INDEX ? 'middle' : 'outer'}
          onClick={onCellClick}
        />
      ));
  };

  return (
    <div className={classes.container}>
      <HiveCellContainer>{renderCellRow(0, 2)}</HiveCellContainer>
      <HiveCellContainer className={hiveCellClasses.middle}>
        {renderCellRow(2, 5)}
      </HiveCellContainer>
      <HiveCellContainer className={hiveCellClasses.last}>
        {renderCellRow(5, 7)}
      </HiveCellContainer>
    </div>
  );
}

export default Hive;
