import React from 'react';
import {Button} from 'antd';
import {useActions} from '../../hooks/useActions';
import {useTypesSelector} from '../../hooks/useTypesSelector';
import {GlobalState} from '../../types';

const ControlButtons: () => JSX.Element = () => {
  const {
    initCounter,
    resetCounter,
    stopCounter,
    pauseCounter,
    resumeCounter
  } = useActions();
  const {globalState} = useTypesSelector(state => state.countDown)

  const isDisabled = (state: GlobalState[]) => {
    return state.includes(globalState);
  }

  return (
    <>
      <span className='control-buttons'>
        <Button
          disabled={isDisabled([GlobalState.STARTED, GlobalState.INIT])}
          onClick={() => {
            resetCounter()
            initCounter()
          }}>Start
        </Button>
        <Button
          disabled={isDisabled([GlobalState.STOPPED])}
          onClick={stopCounter}>Stop
        </Button>
        <Button
          disabled={isDisabled([GlobalState.STOPPED, GlobalState.PAUSED])}
          onClick={pauseCounter}>Pause
        </Button>
        <Button
          disabled={isDisabled([GlobalState.STARTED, GlobalState.INIT, GlobalState.STOPPED])}
          onClick={resumeCounter}>Resume
        </Button>
      </span>
    </>
  )
};

export default ControlButtons;
