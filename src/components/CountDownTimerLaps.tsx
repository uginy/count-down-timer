import React, {useEffect} from 'react';
import {useTypesSelector} from '../hooks/useTypesSelector';
import {useActions} from '../hooks/useActions';

import CountDownTimer from './CountDownTimer';

const CountDownTimerLaps = (): JSX.Element => {
  const {loadLocalState} = useActions()
  const {laps, globalState} = useTypesSelector(state => state.countDown)

  useEffect(() => {
    loadLocalState(globalState)
  }, [])

  return <>
    {laps?.map((el) => <CountDownTimer key={el.id} {...el}/>)}
  </>
};

export default CountDownTimerLaps;
