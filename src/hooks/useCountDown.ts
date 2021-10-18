import React from 'react';
import {settings} from '../consts';

const defaultInterval = 1
const refreshRate = Math.floor(1000 / 60);

interface IActions {
  start: (current: number) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
}

interface ITimer {
  currentTime: number;
  requestId?: number | null | undefined;
}

type ICountDown = [number, IActions]

const useCountDownInterval = (interval: number = defaultInterval): ICountDown => {
  const [currentTime, setCurrentTime] = React.useState<number>(settings.defaultInitialTime);
  const timer = React.useRef<ITimer>({
    currentTime: settings.defaultInitialTime,
    requestId: null,
  });

  const calc = () => {
    if (!timer.current.requestId) {
      return;
    }
    timer.current.currentTime = timer.current.currentTime - (refreshRate * interval);
    timer.current.requestId = window.requestAnimationFrame(calc);
    setCurrentTime(() => timer.current.currentTime);
  }

  const start = React.useCallback(
    (current: number): void => {
      window.cancelAnimationFrame(timer.current.requestId || 0);
      if (current) {
        timer.current.currentTime = current
        setCurrentTime(() => current);
      }
      timer.current.requestId = window.requestAnimationFrame(calc);

    },
    [],
  );

  const stop = React.useCallback(
    (): void => {
      if (!timer.current.requestId) {
        return;
      }
      window.cancelAnimationFrame(timer.current.requestId);
      timer.current.currentTime = 0;
      timer.current.requestId = null;
      setCurrentTime(0);
    },
    [],
  );

  const pause = React.useCallback(
    (): void => {
      if (!timer.current.requestId) {
        return;
      }
      window.cancelAnimationFrame(timer.current.requestId);
    },
    [],
  );

  const resume = React.useCallback(
    (): void => {
      if (!timer.current.requestId) {
        return;
      }
      timer.current.requestId = window.requestAnimationFrame(calc);
      setCurrentTime(timer.current.currentTime);
    },
    [],
  );

  const actions = React.useMemo(
    () => ({start, stop, pause, resume}),
    [],
  );

  return [currentTime, actions];
}

export default useCountDownInterval;
