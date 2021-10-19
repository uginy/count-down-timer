import {ActionTypes, CountDownAction, CountDownState, GlobalState} from '../../types';
import {Dispatch} from 'redux';
import {settings} from '../../consts';

type TLoadSate = (globalState: GlobalState) => (dispatch: Dispatch<CountDownAction>) => void
type TSaveState = (state: CountDownState) => (dispatch: Dispatch<CountDownAction>) => void
type TAction = () => (dispatch: Dispatch<CountDownAction>) => void

export const loadLocalState: TLoadSate = () => {
  return (dispatch: Dispatch<CountDownAction>) => {
    try {
      const storage = localStorage.getItem(settings.localStorageKey);
      if (storage) {
        dispatch({type: ActionTypes.LOAD_STATE_SUCCESS, payload: JSON.parse(storage)})
      } else {
        dispatch({
          type: ActionTypes.LOAD_STATE_ERROR,
          payload: 'Error Loading State From LocalStorage'
        })
      }
    } catch (e) {
      dispatch({
        type: ActionTypes.LOAD_STATE_ERROR,
        payload: 'Error Loading State From LocalStorage'
      })
    }
  }
}

export const saveState: TAction = () => {
  return (dispatch: Dispatch<CountDownAction>) => {
    dispatch({type: ActionTypes.SAVE_STATE})
  }
}

export const saveLocalState: TSaveState = (state: CountDownState) => {
  return (dispatch: Dispatch<CountDownAction>) => {
    try {
      localStorage.setItem(settings.localStorageKey, JSON.stringify(state));
      dispatch({type: ActionTypes.SAVE_STATE_SUCCESS, payload: state})
    } catch (e) {
      dispatch({
        type: ActionTypes.SAVE_STATE_ERROR,
        payload: 'Error Saving State To LocalStorage'
      })
    }
  }
}

export const clearLocalState: TAction = () => {
  return (dispatch: Dispatch<CountDownAction>) => {
    try {
      localStorage.removeItem(settings.localStorageKey);
    } catch (e) {
      dispatch({
        type: ActionTypes.SAVE_STATE_ERROR,
        payload: 'Error Saving State To LocalStorage'
      })
    }
  }
}

