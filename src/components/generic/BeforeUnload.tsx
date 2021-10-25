import React from 'react';
import {Beforeunload} from 'react-beforeunload';

import {useActions} from '../../hooks/useActionsHook';
import {useTypesSelector} from '../../hooks/useTypesSelectorHook';

import {GlobalStatus} from '../../types';

const BeforeUnloadComponent = (): JSX.Element => {
  const {saveState} = useActions()
  const {globalStatus} = useTypesSelector(state => state.countDown)

  const isSaveAllowed = globalStatus !== GlobalStatus.STOPPED

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
