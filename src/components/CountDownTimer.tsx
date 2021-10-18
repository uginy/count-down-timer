import React, {FC, useEffect, useMemo, useRef} from "react";
import useCountDownInterval from '../hooks/useCountDown';
import styled from 'styled-components';
import {msToHms} from '../utils';
import {CountDownLap, LapStatus} from '../types';
import moment from 'moment';

interface StyledProps {
  isNegative?: boolean
}

const StyledCounter = styled.h1<StyledProps>`
  color: ${({isNegative}) => isNegative ? 'red' : 'green'}
`
const StyledResult = styled.h3<StyledProps>`
  color: ${({isNegative}) => isNegative ? 'red' : 'green'};

  & > span {
    margin-left: 1rem;
  }
`;

type Props = CountDownLap

const CountDownTimer: FC<Props> = ({id, startTime, duration, status}) => {
  const mounted = useRef(false);
  const [currentTime, {start, stop, pause, resume}] = useCountDownInterval();

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
      case LapStatus.LAP_PAUSED:
        start(startTime);
        pause()
        break;
      case LapStatus.LAP_RESUMED:
        resume()
        break;
      case LapStatus.LAP_MERGED:
        start(startTime);
        break;
      default:
        start(startTime);
        break;
    }
    return () => {
      mounted.current = false;
      if(status === LapStatus.LAP_MERGED) {
        stop();
      }
    }
  }, [status])

  const isStopped = useMemo(() => status === LapStatus.LAP_STOPPED, [status])

  const startDateTime = moment(Date.now() - startTime).format("DD MMM YYYY HH:mm:ss")
  const endDateTime = moment(Date.now() - (startTime - (duration ?? 0))).format("DD MMM YYYY HH:mm:ss")
  const durationTime = msToHms(duration || 0);
  return (
    <>
      {isStopped
        ? <StyledResult
          isNegative={currentTime <= 0}>{id} / {startDateTime} / {endDateTime} / {durationTime}</StyledResult>
        : <StyledCounter isNegative={currentTime <= 0}>{(msToHms(currentTime))}</StyledCounter>
      }
    </>
  )
};

export default CountDownTimer;
