import HiveCell from './components/hive-cell/HiveCell';
import { Locales, getDictionary } from './dictionaries';

interface IProps {
  params: {
    lang: Locales;
  };
}

export default async function Home({ params: { lang } }: IProps) {
  const dict = await getDictionary(lang);

  return (
    <div>
      <HiveCell letter="T" variant="middle" />
      <HiveCell letter="T" />
    </div>
  );
}
