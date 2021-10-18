import React from 'react';
import {Button} from 'antd';
import {useActions} from '../../hooks/useActions';
import {useTypesSelector} from '../../hooks/useTypesSelector';
import {LapStatus} from '../../types';

const ControlButtons: () => JSX.Element = () => {
  const {
    initCounter,
    resetCounter,
    stopCounter,
    pauseCounter,
    resumeCounter
  } = useActions();
  const {laps} = useTypesSelector(state => state.countDown)
  const lastLapState: LapStatus = laps[laps.length-1]?.status || LapStatus.LAP_STOPPED;

  const isDisabled = (state: LapStatus[]) => {
    return state.includes(lastLapState);
  }
  return <span className='control-buttons'>
      <Button
        disabled={isDisabled([LapStatus.LAP_STARTED])}
        onClick={() => {
        resetCounter()
        initCounter()
      }}>Start
      </Button>
      <Button
        disabled={isDisabled([LapStatus.LAP_STOPPED])}
        onClick={stopCounter}>Stop
      </Button>
      <Button
        disabled={isDisabled([LapStatus.LAP_STOPPED, LapStatus.LAP_PAUSED])}
        onClick={pauseCounter}>Pause
      </Button>
      <Button
        disabled={isDisabled([LapStatus.LAP_STARTED, LapStatus.LAP_STOPPED])}
        onClick={resumeCounter}>Resume
      </Button>
    </span>
};

export default ControlButtons;
