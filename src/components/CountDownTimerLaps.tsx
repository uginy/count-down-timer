import React, {useEffect} from 'react';
import CountDownTimer from './CountDownTimer';
import {useTypesSelector} from '../hooks/useTypesSelector';
import {useActions} from '../hooks/useActions';

const CountDownTimerLaps = (): JSX.Element => {
  const {loadLocalState} = useActions()
  const {laps, globalState} = useTypesSelector(state => state.countDown)

  useEffect(() => {
    loadLocalState()
  }, [])

  return (
    <>
      {globalState}
      {laps?.map((el) => (
        <CountDownTimer key={el.id} {...el}/>
      ))}
    </>
  );
};

export default CountDownTimerLaps;
