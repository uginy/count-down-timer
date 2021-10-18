import React, {useEffect} from 'react';
import CountDownTimer from './CountDownTimer';
import {useTypesSelector} from '../hooks/useTypesSelector';
import {useActions} from '../hooks/useActions';
const CountDownTimerLaps = (): JSX.Element => {
  const {loadLocalState} = useActions()
  const {laps} = useTypesSelector(state => state.countDown)

  useEffect(() => {
    loadLocalState()
  }, [])

  return (
    <div>
      {laps?.map((el) => (
        <CountDownTimer key={el.id} {...el}/>
      ))}
    </div>
  );
};

export default CountDownTimerLaps;
