import { Locales } from '@/lib/dictionaries';
import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { isEqual, shuffle, sortBy } from 'lodash';

const WORDLIST_FILE_PATH_EN = './src/data/wordlist_en.txt';
const WORDLIST_FILE_PATH_TR = './src/data/wordlist_tr.txt';
const ANSWERS_OUTPUT_PATH_EN = './src/data/en.json';
const ANSWERS_OUTPUT_PATH_TR = './src/data/tr.json';
const MIN_WORD_COUNT = 15;

interface IAnswer {
  pangrams: string[];
  middleLetter: string;
  validLetters: string[];
  answers: string[];
}

const checkIsWordValid = (word: string): boolean => {
  if (word.length < 4) return false;

  const uniqueLetters = new Set(word);

  if (uniqueLetters.size > 7) return false;

  return true;
};

const getValidWords = (words: string[]) => {
  return words.filter((word) => checkIsWordValid(word));
};

const getPangrams = (words: string[]) => {
  return words.filter((word) => new Set(word).size === 7);
};

const checkIsEveryLetterExist = (word: string, uniqueLetters: Set<string>) => {
  const isExist = word.split('').every((letter) => uniqueLetters.has(letter));

  return isExist;
};

// check is answer duplicate if it has same answers and valid letters.
const checkIsDuplicateAnswer = (
  answers: IAnswer[],
  matchedWords: string[],
  pangram: string
) => {
  const isDuplicate = answers.some((answer) => {
    const sameAnswers = isEqual(sortBy(matchedWords), sortBy(answer.answers));

    const sameValidLetters = answer.validLetters.every((letter) =>
      pangram.includes(letter)
    );

    return sameAnswers && sameValidLetters;
  });

  return isDuplicate;
};

// Get existing answer if it has same middle letter and valid letters.
const getExistingAnswer = (
  answers: IAnswer[],
  middleLetter: string,
  pangram: string
) => {
  const answer = answers.find((answer) => {
    return (
      answer.middleLetter === middleLetter &&
      answer.validLetters.every((letter) => pangram.includes(letter))
    );
  });

  return answer;
};

const generateAnswerFile = (pangrams: string[], validWords: string[]) => {
  const file: IAnswer[] = [];

  pangrams.forEach((pangram) => {
    const uniqueLetters = new Set(pangram);

    uniqueLetters.forEach((middleLetter) => {
      const answer = getExistingAnswer(file, middleLetter, pangram);
      if (answer) return answer.pangrams.push(pangram);

      const matchedWords = validWords.filter((word) => {
        if (!word.includes(middleLetter)) return;

        return checkIsEveryLetterExist(word, uniqueLetters);
      });

      if (matchedWords.length < MIN_WORD_COUNT) return;

      if (checkIsDuplicateAnswer(file, matchedWords, pangram)) return;

      file.push({
        pangrams: [pangram],
        answers: matchedWords,
        middleLetter,
        validLetters: shuffle(Array.from(uniqueLetters)),
      });
    });
  });

  return file;
};

export const writeAnswersFile = async (lang: Locales) => {
  const outputPath =
    lang === 'en' ? ANSWERS_OUTPUT_PATH_EN : ANSWERS_OUTPUT_PATH_TR;

  const isAnswerFileExist = existsSync(outputPath);

  if (!isAnswerFileExist) {
    const filePath =
      lang === 'en' ? WORDLIST_FILE_PATH_EN : WORDLIST_FILE_PATH_TR;

    const data = await readFile(filePath);

    const words = data
      .toString()
      .split('\n')
      .map((line) => line.toLowerCase().replace(/(\r\n|\n|\r)/gm, ''));

    const validWords = getValidWords(words);

    const pangrams = getPangrams(validWords);

    const answers = generateAnswerFile(pangrams, validWords);

    await writeFile(outputPath, JSON.stringify(answers, null, 3), 'utf-8');
  }
};
