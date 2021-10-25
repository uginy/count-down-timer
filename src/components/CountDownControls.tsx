import React from 'react';
import {Col, Row} from 'antd';

import {useHotkeys} from 'react-hotkeys-hook';
import {useActions} from '../hooks/useActionsHook';
import {useTypesSelector} from '../hooks/useTypesSelectorHook';

import TimePickerField from './generic/TimePicker';
import ControlButtons from './generic/ControlButtons';
import GlobalStateInfo from './generic/GlobalStateInfo';

import {GlobalStatus} from '../types';

const CountDownControls = (): JSX.Element => {
  const {startCounter, mergeCounter} = useActions()
  const {globalStatus} = useTypesSelector(state => state.countDown)

  const isNewCounter = globalStatus !== GlobalStatus.STOPPED

  useHotkeys('space', () => {
    isNewCounter && startCounter()
  }, [globalStatus]);

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
