import {Dispatch} from 'redux';
import {settings} from '../../consts';
import {ActionTypes, CountDownAction} from '../../types';

type ICreator = (ms?: number) => (dispatch: Dispatch<CountDownAction>) => void
export const setTime: ICreator = (ms: number = settings.defaultInitialTime) => {
  return (dispatch: Dispatch<CountDownAction>) => {
    dispatch({type: ActionTypes.SET_TIME, payload: ms})
  }
}
