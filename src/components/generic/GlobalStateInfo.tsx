import React from 'react';
import {useTypesSelector} from '../../hooks/useTypesSelectorHook';

const GlobalStateInfo = (): JSX.Element => {
  const {globalStatus} = useTypesSelector(state => state.countDown)
  return <div className='global-state'>
    {globalStatus}
  </div>
};

export default GlobalStateInfo;
