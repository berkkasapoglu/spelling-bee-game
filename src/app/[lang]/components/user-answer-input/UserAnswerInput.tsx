'use client';

import { useEffect, useState } from 'react';
import classes from './UserAnswerInput.module.scss';
import { VALIDATION_REGEX, VALID_TURKISH_CHARS } from './UserAnswer.constants';

interface IProps {
  value: string;
  onChange?: (value: string) => void;
  middleChar: string;
}

function UserAnswerInput() {
  const [value, setValue] = useState('');

  useEffect(() => {
    const handleKeydown = ({ key }: KeyboardEvent) => {
      if (key === 'Backspace')
        return setValue((prev) => prev.slice(0, prev.length - 1));

      const regex = new RegExp(VALIDATION_REGEX);
      if (!regex.test(key)) return;

      const isValid =
        (key >= 'a' && key <= 'z') || VALID_TURKISH_CHARS.includes(key);

      if (!isValid) return;

      setValue((prev) => prev + key);
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <>
      <div
        className={classes.input}
        onInput={(e) => {
          console.log('e.target', e.target);
        }}
      >
        {value}
      </div>
    </>
  );
}
export default UserAnswerInput;
