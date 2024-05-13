import { Locales } from '../../lib/dictionaries';
import SpellingGame from './components/spelling-game/SpellingGame';
import getFile from '../../helpers/get-file';
import { IGame } from './components/spelling-game/SpellingGame.types';

interface IProps {
  params: {
    lang: Locales;
  };
}

export default async function Home({ params: { lang } }: IProps) {
  const file = await getFile();

  const getRandomGame = (games: IGame[]) => {
    const index = Math.floor(Math.random() * games.length);
    const game = games[index];

    const middleLetterIndex = game.validLetters.indexOf(game.middleLetter);
    const replacedLetter = game.validLetters[3];
    game.validLetters[3] = game.middleLetter;
    game.validLetters[middleLetterIndex] = replacedLetter;

    return games[0];
  };

  return <SpellingGame game={getRandomGame(JSON.parse(file))} />;
}
