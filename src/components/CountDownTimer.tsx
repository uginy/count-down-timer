import React, {FC, useEffect, useMemo, useRef} from "react";
import clsx from 'clsx';

import {useActions} from '../hooks/useActionsHook';
import {useTypesSelector} from '../hooks/useTypesSelectorHook';
import useCountDownInterval from '../hooks/useCountDownHook';

import {CountDownLap, GlobalStatus, LapStatus} from '../types';
import {msToHms} from '../utils';

const CountDownTimer: FC<CountDownLap> = ({id, currentTime, startTime, status}) => {
  const mounted = useRef(false);
  const {startedCounter, mergedCounter, updatedCounter, saveLocalState} = useActions()
  const state = useTypesSelector(state => state.countDown);
  const {globalStatus} = state;
  const [nowTime, {start, stop, pause, resume}] = useCountDownInterval();
  const isStateLoaded = useMemo(() => globalStatus === GlobalStatus.LOADED, [globalStatus])


  useEffect(() => {
    if (globalStatus === GlobalStatus.SAVED) {
      updatedCounter(nowTime);
      saveLocalState(state);
    }
  }, [globalStatus])

  useEffect(() => {
    mounted.current = true;
    if (!mounted.current) {
      stop();
      return;
    }
    switch (status as LapStatus) {
      case LapStatus.LAP_STOPPED:
        stop()
        break;
      case LapStatus.LAP_STARTED_MERGED:
        start(currentTime)
        break;
      case LapStatus.LAP_PAUSED:
        pause(isStateLoaded ? currentTime : null)
        break;
      case LapStatus.LAP_RESUMED:
        resume(isStateLoaded ? currentTime : null)
        break;
      case LapStatus.LAP_MERGED:
        mergedCounter(nowTime);
        stop();
        break;
      case LapStatus.LAP_CREATED:
        startedCounter(nowTime);
        stop();
        break;
      case LapStatus.LAP_LOADED:
        start(currentTime);
        break;
      default:
        start(currentTime);
        break;
    }
    return () => {
      updatedCounter(nowTime)
      mounted.current = false;
    }
  }, [status])

  const startDateTime = useMemo(() => msToHms(startTime), [status])
  const endDateTime = msToHms(nowTime)
  const durationTime = msToHms(startTime - Math.abs(nowTime))

  const isNegativeTimer = nowTime <= 0;

  return (
    <div className={clsx('timer-row', isNegativeTimer && 'negative')}>
        <div className="counter">{endDateTime}</div>
        <div className="counter-id"><small>ID</small><span>{id}</span></div>
        <div><small>Start Time</small>{startDateTime}</div>
        <div><small>End Time</small>{endDateTime}</div>
        <div><small>Duration</small>{durationTime}</div>
        <div className="counter-status"><small>Status</small>{status}</div>
    </div>
  )
};

export default CountDownTimer;
