import { Locales } from './dictionaries';
import SpellingGame from './components/spelling-game/SpellingGame';
import getFile from '../helpers/get-file';

interface IProps {
  params: {
    lang: Locales;
  };
}

export default async function Home({ params: { lang } }: IProps) {
  const file = await getFile();

  return <SpellingGame games={JSON.parse(file)} />;
}
