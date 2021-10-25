import {Dispatch} from 'redux';
import {CONFIG} from '../../constants';
import {ActionTypes, CountDownAction} from '../../types';

type ICreator = (ms?: number) => (dispatch: Dispatch<CountDownAction>) => void
export const setTime: ICreator = (ms: number = CONFIG.defaultInitialTime) => {
  return (dispatch: Dispatch<CountDownAction>) => {
    dispatch({type: ActionTypes.SET_TIME, payload: ms})
  }
}
