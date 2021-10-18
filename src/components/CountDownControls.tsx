import React from 'react';
import {useHotkeys} from 'react-hotkeys-hook';
import {Col, Row} from 'antd';
import TimePickerField from './generic/TimePicker';
import ControlButtons from './generic/ControlButtons';
import {useActions} from '../hooks/useActions';
import {useTypesSelector} from '../hooks/useTypesSelector';
import {GlobalState} from '../types';

const CountDownControls = (): JSX.Element => {
  const {startCounter, mergeCounter} = useActions()
  const {globalState} = useTypesSelector(state => state.countDown)

  useHotkeys('space', () => {
    if (globalState !== GlobalState.STOPPED) {
      startCounter()
    }
  }, [globalState]);

  useHotkeys('backspace', () => {
    mergeCounter()
  }, []);

  return (
    <Row align={'middle'}>
      <Col className='control-bar'>
        <TimePickerField/>
        <ControlButtons/>
      </Col>
    </Row>
  );
};

export default CountDownControls;
