import Image from 'next/image';
import classes from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../ui/icon-button/IconButton';

function Header() {
  return (
    <nav className={classes.container}>
      <div className={classes.content}>
        <Image src="/images/bee.png" alt="bee-logo" width={20} height={25} />
        <h1>Spelling Bee Game</h1>
        <IconButton icon={faTrophy} width={20} />
      </div>
    </nav>
  );
}
export default Header;
