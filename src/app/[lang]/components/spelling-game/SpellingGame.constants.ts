export const MIDDLE_LETTER_INDEX = 3;

export const SCORES = {
  pangram: 18,
  min: 1,
};

export const MIN_WORD_LENGTH = 4;

type Levels =
  | 'beginner'
  | 'novice'
  | 'okay'
  | 'good'
  | 'solid'
  | 'nice'
  | 'great'
  | 'amazing'
  | 'genius';

export const SCORE_PROGRESS_STOPS: { label: Levels; value: number }[] = [
  { label: 'beginner', value: 0 },
  { label: 'novice', value: 5 },
  { label: 'okay', value: 15 },
  { label: 'good', value: 25 },
  { label: 'solid', value: 35 },
  { label: 'nice', value: 45 },
  { label: 'great', value: 55 },
  { label: 'amazing', value: 65 },
  { label: 'genius', value: 80 },
];

export const CORRECT_ANSWER_TIME_GAIN = 15;
