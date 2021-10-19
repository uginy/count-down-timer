import React from 'react';
import moment, {Moment} from 'moment';
import {TimePicker} from 'antd';

import {useTypesSelector} from '../../hooks/useTypesSelector';
import {useActions} from '../../hooks/useActions';

import {msToHms} from '../../utils';

const TimePickerField: () => JSX.Element = () => {
  const {initialTimer} = useTypesSelector(state => state.countDown)
  const {setTime} = useActions()

  const setTimeHandler = (value: Moment | null) => {
    setTime(moment.duration(value?.format('HH:mm:ss')).asMilliseconds())
  }
  return <TimePicker className='time-picker'
                     value={moment(msToHms(initialTimer), 'HH:mm:ss')}
                     onChange={setTimeHandler}/>
};

export default TimePickerField;
