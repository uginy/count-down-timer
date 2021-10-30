import React, {FC} from 'react';
import {useActions} from '../../hooks/useActionsHook';
import ErrorFallback from './ErrorFallback';
import {ErrorBoundary} from 'react-error-boundary';

const MainWrapper: FC = ({children}) => {
  const {resetCounter} = useActions()
  return (
    <main>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={resetCounter}>
        {children}
      </ErrorBoundary>
    </main>
  )
};

export default MainWrapper;
