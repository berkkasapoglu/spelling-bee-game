'use client';

import { useEffect } from 'react';
import classes from './UserAnswerInput.module.scss';
import classNames from 'classnames';

interface IProps {
  value: string;
  onChange?: (value: string) => void;
  middleChar: string;
}

function UserAnswerInput({ value, onChange, middleChar }: IProps) {
  useEffect(() => {
    const handleKeydown = ({ key }: KeyboardEvent) => {
      onChange?.(key);
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <>
      <div className={classes.input}>
        {value.split('').map((letter, idx) => (
          <span
            key={idx}
            className={classNames({ [classes.middle]: middleChar == letter })}
          >
            {letter}
          </span>
        ))}
      </div>
    </>
  );
}
export default UserAnswerInput;
