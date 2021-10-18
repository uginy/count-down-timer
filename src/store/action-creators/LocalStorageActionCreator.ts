import {ActionTypes, CountDownAction, CountDownState} from '../../types';
import {Dispatch} from 'redux';
import {settings} from '../../consts';

type TLoadSate = () => (dispatch: Dispatch<CountDownAction>) => void
type TSaveState = (state: CountDownState) => (dispatch: Dispatch<CountDownAction>) => void

export const loadLocalState: TLoadSate = () => {
  return (dispatch: Dispatch<CountDownAction>) => {
    try {
      const storage = localStorage.getItem(settings.localStorageKey);
      if (storage) {
        dispatch({type: ActionTypes.LOAD_STATE_SUCCESS, payload: JSON.parse(storage)})
      }
    } catch (e) {
      dispatch({
        type: ActionTypes.LOAD_STATE_ERROR,
        payload: 'Error Loading State From LocalStorage'
      })
    }
  }
}

export const saveLocalState: TSaveState = (state: CountDownState) => {
  return (dispatch: Dispatch<CountDownAction>) => {
    try {
      console.log(state)
      dispatch({type: ActionTypes.SAVE_STATE})
      localStorage.setItem(settings.localStorageKey, JSON.stringify(state));
      dispatch({type: ActionTypes.SAVE_STATE_SUCCESS})
    } catch (e) {
      dispatch({
        type: ActionTypes.SAVE_STATE_ERROR,
        payload: 'Error Saving State To LocalStorage'
      })
    }
  }
}
