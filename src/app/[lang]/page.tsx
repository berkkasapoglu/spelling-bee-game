import HiveCellContainer from './components/hive-cell-container/HiveCellContainer';
import HiveCell from './components/hive-cell/HiveCell';
import hiveClasses from './components/hive-cell-container/HiveCellContainer.module.scss';
import classes from './page.module.css';
import { Locales, getDictionary } from './dictionaries';
import ProgressBar from './components/progress-bar/ProgressBar';
import AnswerList from './components/answer-list/AnswerList';

interface IProps {
  params: {
    lang: Locales;
  };
}

export default async function Home({ params: { lang } }: IProps) {
  const dict = await getDictionary(lang);

  return (
    <>
      <ProgressBar />
      <AnswerList />
      <div className={classes.container}>
        <HiveCellContainer>
          <HiveCell letter="T" />
          <HiveCell letter="T" />
        </HiveCellContainer>
        <HiveCellContainer className={hiveClasses.middle}>
          <HiveCell letter="T" />
          <HiveCell letter="T" variant="middle" />
          <HiveCell letter="T" />
        </HiveCellContainer>
        <HiveCellContainer className={hiveClasses.last}>
          <HiveCell letter="T" />
          <HiveCell letter="T" />
        </HiveCellContainer>
      </div>
    </>
  );
}
