import fs from 'node:fs/promises';

export async function GET(request: Request) {
  const path = process.cwd() + '/src/app/data/answers.json';
  const file = await fs.readFile(path, 'utf8');
  console.log('request', request);
  return Response.json(file);
}
