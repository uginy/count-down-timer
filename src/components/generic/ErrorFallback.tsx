import React, {FC} from 'react';
import {Button} from 'antd';

type ErrorProps = {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}
const ErrorFallback: FC<ErrorProps> = ({error, resetErrorBoundary}) => {
  return (
    <>
      <p>Something Went Wrong</p>
      <pre>{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </>
  );
};

export default ErrorFallback;
