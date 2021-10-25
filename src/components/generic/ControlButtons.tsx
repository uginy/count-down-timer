import React from 'react';
import {Button} from 'antd';

import {useActions} from '../../hooks/useActionsHook';
import {useTypesSelector} from '../../hooks/useTypesSelectorHook';

import {GlobalStatus} from '../../types';

const ControlButtons: () => JSX.Element = () => {
  const {
    resetCounter,
    stopCounter,
    pauseCounter,
    resumeCounter,
    clearLocalState
  } = useActions();
  const {globalStatus} = useTypesSelector(state => state.countDown)

  const isDisabled = (state: GlobalStatus[]) => state.includes(globalStatus)

  const isStartDisabled
    = isDisabled([GlobalStatus.STARTED, GlobalStatus.LOADED, GlobalStatus.PAUSED, GlobalStatus.RESUMED])
  const isStopDisabled
    = isDisabled([GlobalStatus.STOPPED, GlobalStatus.INIT])
  const isPauseDisabled
    = isDisabled([GlobalStatus.STOPPED, GlobalStatus.PAUSED, GlobalStatus.INIT])
  const isResumeDisabled
    = isDisabled([GlobalStatus.STARTED, GlobalStatus.INIT, GlobalStatus.STOPPED, GlobalStatus.RESUMED, GlobalStatus.LOADED])

  const stopAndClear = () => {
    stopCounter();
    clearLocalState();
  }

  return (
    <span className='control-buttons'>
        <Button disabled={isStartDisabled} onClick={resetCounter}>Start</Button>
        <Button disabled={isStopDisabled} onClick={stopAndClear}>Stop</Button>
        <Button disabled={isPauseDisabled} onClick={pauseCounter}>Pause</Button>
        <Button disabled={isResumeDisabled} onClick={resumeCounter}>Resume</Button>
    </span>
  )
};

export default ControlButtons;
