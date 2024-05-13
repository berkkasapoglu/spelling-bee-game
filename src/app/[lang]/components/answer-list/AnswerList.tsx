'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './AnswerList.module.scss';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import classNames from 'classnames';
import { cloneDeep } from 'lodash';

interface IProps {
  list: string[];
}

function AnswerList({ list }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (!list.length) return;

    setIsOpen((prev) => !prev);
  };

  const renderAnswerList = () => {
    if (!isOpen) return;

    const clonedList = cloneDeep(list);

    return (
      <div className={classNames([classes.words, { [classes.open]: isOpen }])}>
        {clonedList.sort().map((word, idx) => (
          <p key={idx} className={classes.item}>
            {word}
          </p>
        ))}
      </div>
    );
  };

  const renderDropdownInfo = () => {
    if (!list.length) return <p>Your Words...</p>;

    if (isOpen)
      return (
        <p>
          You have found <strong>{list.length}</strong>{' '}
          {list.length > 1 ? 'words' : 'word'}
        </p>
      );

    return <div className={classes.highlight}>{list.join(', ')}</div>;
  };

  return (
    <div
      className={classNames([classes.list, { [classes.open]: isOpen }])}
      onClick={handleOpen}
    >
      {renderDropdownInfo()}
      {renderAnswerList()}
      <FontAwesomeIcon
        className={classes.arrowDown}
        icon={faChevronDown}
        width={10}
        height={10}
      />
    </div>
  );
}
export default AnswerList;
