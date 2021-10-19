import React, {FC, useEffect, useMemo, useRef} from "react";
import styled from 'styled-components';

import {useActions} from '../hooks/useActions';
import {useTypesSelector} from '../hooks/useTypesSelector';
import useCountDownInterval from '../hooks/useCountDown';

import {CountDownLap, GlobalState, LapStatus} from '../types';
import {msToHms} from '../utils';

interface StyledProps {
  isNegative?: boolean
}

const StyledResult = styled.h3<StyledProps>`
  color: ${({isNegative}) => isNegative ? 'red' : 'green'};
`;

const CountDownTimer: FC<CountDownLap> = ({id, currentTime, startTime, status}) => {
  const mounted = useRef(false);
  const {startedCounter, mergedCounter, updatedCounter, saveLocalState} = useActions()
  const state = useTypesSelector(state => state.countDown);
  const {globalState} = state;
  const [nowTime, {start, stop, pause, resume}] = useCountDownInterval();
  const isStateLoaded = useMemo(() => globalState === GlobalState.LOADED, [globalState])


  useEffect(() => {
    switch (globalState) {
      case GlobalState.SAVED:
        updatedCounter(nowTime);
        saveLocalState(state);
        break;
      default:
        break;
    }
  }, [globalState])

  useEffect(() => {
    mounted.current = true;
    if (!mounted.current) {
      stop();
      return;
    }
    switch (status) {
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
        startedCounter(nowTime)
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
  const durationTime = msToHms(startTime - Math.abs(nowTime) || 0)

  return (
    <div className='timer-row'>
      <StyledResult isNegative={nowTime <= 0}>
        <div className="counter">{endDateTime}</div>
        <div className="counter-id"><small>ID</small><span>{id}</span></div>
        <div><small>Start Time</small>{startDateTime}</div>
        <div><small>End Time</small>{endDateTime}</div>
        <div><small>Duration</small>{durationTime}</div>
        <div className="counter-status"><small>Status</small>{status}</div>
      </StyledResult>
    </div>
  )
};

export default CountDownTimer;
