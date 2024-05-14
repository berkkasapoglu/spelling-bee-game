import { Locales } from '../../lib/dictionaries';
import SpellingGame from './components/spelling-game/SpellingGame';
import getFile from '../../helpers/get-file';
import { IGame } from './components/spelling-game/SpellingGame.types';
import { MIDDLE_LETTER_INDEX } from './components/spelling-game/SpellingGame.constants';

interface IProps {
  params: {
    lang: Locales;
  };
}

export default async function Home({ params: { lang } }: IProps) {
  const file = await getFile();

  const getRandomGame = (games: IGame[]) => {
    //FIXME: const index = Math.floor(Math.random() * games.length);
    const index = 0;
    const game = games[index];

    const middleLetterIndex = game.validLetters.indexOf(game.middleLetter);
    const replacedLetter = game.validLetters[MIDDLE_LETTER_INDEX];
    game.validLetters[MIDDLE_LETTER_INDEX] = game.middleLetter;
    game.validLetters[middleLetterIndex] = replacedLetter;

    return games[index];
  };

  return <SpellingGame gameData={getRandomGame(JSON.parse(file))} />;
}
