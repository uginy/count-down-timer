import React from 'react';
import {Beforeunload} from 'react-beforeunload';
import {useActions} from '../../hooks/useActions';
import {useTypesSelector} from '../../hooks/useTypesSelector';

const BeforeUnload = (): JSX.Element => {
  const {saveLocalState} = useActions()
  const state = useTypesSelector(state => state.countDown)

  const saveStateHandler = () => {
    console.log(state)
    saveLocalState({...state})
  }

  return <Beforeunload onBeforeunload={() => saveStateHandler()}/>
};

export default BeforeUnload;
