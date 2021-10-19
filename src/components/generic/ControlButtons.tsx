import React from 'react';
import {Button} from 'antd';

import {useActions} from '../../hooks/useActions';
import {useTypesSelector} from '../../hooks/useTypesSelector';

import {GlobalState} from '../../types';

const ControlButtons: () => JSX.Element = () => {
  const {
    resetCounter,
    stopCounter,
    pauseCounter,
    resumeCounter,
    clearLocalState
  } = useActions();
  const {globalState} = useTypesSelector(state => state.countDown)

  const isDisabled = (state: GlobalState[]) => state.includes(globalState)

  const isStartDisabled = isDisabled([GlobalState.STARTED, GlobalState.LOADED, GlobalState.PAUSED])
  const isStopDisabled = isDisabled([GlobalState.STOPPED, GlobalState.INIT])
  const isPauseDisabled = isDisabled([GlobalState.STOPPED, GlobalState.PAUSED, GlobalState.INIT])
  const isResumeDisabled = isDisabled([GlobalState.STARTED, GlobalState.INIT, GlobalState.STOPPED, GlobalState.RESUMED, GlobalState.LOADED])

  const stopAndClear = () => {
    stopCounter();
    clearLocalState();
  }

  return (
    <span className='control-buttons'>
        <Button disabled={isStartDisabled} onClick={resetCounter}>Start</Button>
        <Button disabled={isStopDisabled} onClick={stopAndClear}>Stop</Button>
        <Button disabled={isPauseDisabled} onClick={pauseCounter}>Pause</Button>
        <Button disabled={isResumeDisabled} onClick={resumeCounter}>Resume </Button>
    </span>
  )
};

export default ControlButtons;
