import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Locales, getDictionary } from '../../lib/dictionaries';
import Header from '@/components/layout/Header';
import DictionaryProvider from '@/contexts/DictionaryProvider';

const nunito = Nunito({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Spelling Bee',
  description: 'A Spelling Bee Puzzle Game.',
};

interface IProps {
  children: React.ReactNode;
  params: { lang: Locales };
}

export default async function RootLayout({ children, params }: IProps) {
  const dictionary = await getDictionary(params.lang);

  return (
    <html lang={params.lang}>
      <body className={nunito.className}>
        <DictionaryProvider dictionary={dictionary}>
          <Header lang={params.lang} />
          <main>{children}</main>
        </DictionaryProvider>
      </body>
    </html>
  );
}
