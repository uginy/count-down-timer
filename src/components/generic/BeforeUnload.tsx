import React from 'react';
import {Beforeunload} from 'react-beforeunload';

import {useActions} from '../../hooks/useActions';
import {useTypesSelector} from '../../hooks/useTypesSelector';

import {GlobalState} from '../../types';

const BeforeUnloadComponent = (): JSX.Element => {
  const {saveState} = useActions()
  const {globalState} = useTypesSelector(state => state.countDown)

  const isSaveAllowed = globalState !== GlobalState.STOPPED

  const saveStateHandler = (e: Event) => {
    if (!isSaveAllowed) {
      return;
    }
    saveState();
    e.preventDefault();
  }
  return <Beforeunload onBeforeunload={saveStateHandler}/>
};

export default BeforeUnloadComponent;
