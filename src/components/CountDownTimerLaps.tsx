import React, {useEffect} from 'react';
import {useTypesSelector} from '../hooks/useTypesSelectorHook';
import {useActions} from '../hooks/useActionsHook';

import CountDownTimer from './CountDownTimer';

const CountDownTimerLaps = (): JSX.Element => {
  const {loadLocalState} = useActions()
  const {laps, globalStatus} = useTypesSelector(state => state.countDown)

  useEffect(() => {
    loadLocalState(globalStatus)
  }, [])

  return <>
    {laps?.map((el) => <CountDownTimer key={el.id} {...el}/>).sort()}
  </>
};

export default CountDownTimerLaps;
