import React from 'react';
import {CONFIG} from '../constants';

const refreshRate = Math.floor(1000 / 60);

interface IActions {
  start: (current: number) => void;
  stop: (current?: number) => void;
  pause: (current?: number | null) => void;
  resume: (current?: number | null) => void;
}

interface ITimer {
  currentTime: number;
  requestId?: number | null | undefined;
}

type ICountDown = [number, IActions]

const useCountDownInterval = (interval: number = CONFIG.defaultInterval): ICountDown => {
  const [currentTime, setCurrentTime] = React.useState<number>(CONFIG.defaultInitialTime);
  const timer = React.useRef<ITimer>({
    currentTime: CONFIG.defaultInitialTime,
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
    (current?: number): void => {
      if(current) {
        timer.current.currentTime = current;
        setCurrentTime(() => current);
      }
      if (!timer.current.requestId) {
        return;
      }
      window.cancelAnimationFrame(timer.current.requestId);
      if(!current) {
        setCurrentTime(timer.current.currentTime);
        timer.current.currentTime = 0;
        timer.current.requestId = null;
      }
    },
    [],
  );

  const pause = React.useCallback(
    (current?: number | null): void => {
      if (current) {
        timer.current.currentTime = current;
        setCurrentTime(() => current);
      }
      if (!timer.current.requestId) {
        return;
      }
      window.cancelAnimationFrame(timer.current.requestId);
      if (!current) {
        setCurrentTime(timer.current.currentTime);
      }
    },
    [],
  );

  const resume = React.useCallback(
    (current?: number | null): void => {
      if (current) {
        timer.current.currentTime = current;
        setCurrentTime(() => current);
      }
      if (!timer.current.requestId) {
        return;
      }
      timer.current.requestId = window.requestAnimationFrame(calc);
      if(!current) {
        setCurrentTime(timer.current.currentTime);
      }
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
