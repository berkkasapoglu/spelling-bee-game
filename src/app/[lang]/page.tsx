import { Locales, getDictionary } from './dictionaries';

interface IProps {
  params: {
    lang: Locales;
  };
}

export default async function Home({ params: { lang } }: IProps) {
  const dict = await getDictionary(lang);

  return <h1>Spelling Bee Game</h1>;
}
