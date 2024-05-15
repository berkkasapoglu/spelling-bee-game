import useInfoModalStore from '@/store/useInfoModalStore';
import { useEffect, useState } from 'react';

function useTimer() {
  const [time, setTime] = useState(10);
  const { resultModalVisible } = useInfoModalStore();

  useEffect(() => {
    if (time === 0) return;

    const intervalId = setInterval(() => {
      if (resultModalVisible) return;

      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time, resultModalVisible]);

  return { time, changeTime: setTime };
}
export default useTimer;
