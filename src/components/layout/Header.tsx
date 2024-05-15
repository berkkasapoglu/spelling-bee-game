'use client';

import Image from 'next/image';
import classes from './Header.module.scss';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../ui/icon-button/IconButton';
import useInfoModalStore from '@/store/useInfoModalStore';
import { Locales } from '@/lib/dictionaries';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Header({ lang }: { lang: Locales }) {
  const { toggleLevelInfoModal } = useInfoModalStore();
  const router = useRouter();

  const setCookie = (locale: Locales) => {
    document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`;
  };

  const onLanguageSwitch = () => {
    const locale = lang === 'en' ? 'tr' : 'en';
    setCookie(locale);
    router.replace(locale);
  };

  return (
    <nav className={classes.container}>
      <div className={classes.content}>
        <Image src="/images/bee.png" alt="bee-logo" width={20} height={25} />
        <h1>Spelling Bee Game</h1>
        <div className={classes.rightBox}>
          <IconButton
            icon={faTrophy}
            onClick={() => toggleLevelInfoModal(true)}
            width={20}
          />
          <Link
            className={classes.language}
            href={lang === 'en' ? 'tr' : 'en'}
            onClick={onLanguageSwitch}
          >
            {lang === 'en' ? 'en' : 'tr'}
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Header;
