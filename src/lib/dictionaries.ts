import 'server-only';

export type Locales = keyof typeof dictionaries;

const dictionaries = {
  en: () =>
    import('../app/dictionaries/en.json').then((module) => module.default),
  tr: () =>
    import('../app/dictionaries/tr.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locales) => dictionaries[locale]();
