import React from 'react';
import {Col, Row} from 'antd';

import {useHotkeys} from 'react-hotkeys-hook';
import {useActions} from '../hooks/useActions';
import {useTypesSelector} from '../hooks/useTypesSelector';

import TimePickerField from './generic/TimePicker';
import ControlButtons from './generic/ControlButtons';
import GlobalStateInfo from './generic/GlobalStateInfo';

import {GlobalState} from '../types';

const CountDownControls = (): JSX.Element => {
  const {startCounter, mergeCounter} = useActions()
  const {globalState} = useTypesSelector(state => state.countDown)

  const isNewCounter = globalState !== GlobalState.STOPPED

  useHotkeys('space', () => {
    isNewCounter && startCounter()
  }, [globalState]);

  useHotkeys('backspace', () => {
    mergeCounter()
  }, []);

  return (
    <Row align={'middle'}>
      <Col className='control-bar'>
        <TimePickerField/>
        <ControlButtons/>
        <GlobalStateInfo/>
      </Col>
    </Row>
  );
};

export default CountDownControls;
