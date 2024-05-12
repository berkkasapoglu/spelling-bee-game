import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Locales } from './dictionaries';
import Header from '@/components/layout/Header';

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

export default function RootLayout({ children, params }: IProps) {
  return (
    <html lang={params.lang}>
      <body className={nunito.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
