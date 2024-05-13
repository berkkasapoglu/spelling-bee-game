import fs from 'node:fs/promises';

const getFile = async () => {
  const path = process.cwd() + '/src/app/data/answers.json';
  const file = await fs.readFile(path, 'utf8');

  return file;
};

export default getFile;
