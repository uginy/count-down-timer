import React from 'react';
import {useTypesSelector} from '../../hooks/useTypesSelector';

const GlobalStateInfo = (): JSX.Element => {
  const {globalState} = useTypesSelector(state => state.countDown)
  return <div className='global-state'>
    {globalState}
  </div>
};

export default GlobalStateInfo;
