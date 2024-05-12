'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './AnswerList.module.scss';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import classNames from 'classnames';
import { cloneDeep } from 'lodash';

const MOCK_WORD_LIST: string[] = ['cccc', 'a', 't', 'b'];

function AnswerList() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (!MOCK_WORD_LIST.length) return;

    setIsOpen((prev) => !prev);
  };

  const renderAnswerList = () => {
    if (!isOpen) return;

    const clonedList = cloneDeep(MOCK_WORD_LIST);

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
    if (!MOCK_WORD_LIST.length) return <p>Your Words...</p>;

    return <div className={classes.highlight}>{MOCK_WORD_LIST.join(', ')}</div>;
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
