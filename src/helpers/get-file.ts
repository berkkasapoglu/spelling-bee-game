import { Locales } from '@/lib/dictionaries';
import fs from 'node:fs/promises';
import { writeAnswersFile } from './generate-answers-file';

const getFile = async (lang: Locales) => {
  await writeAnswersFile(lang);

  console.log('runnn');

  const path = process.cwd() + `/src/data/${lang}.json`;
  const file = await fs.readFile(path, 'utf8');

  return file;
};

export default getFile;
