import {ActionTypes, CountDownAction, CountDownState, GlobalStatus} from '../../types';
import {Dispatch} from 'redux';
import {CONFIG} from '../../constants';

type TLoadSate = (globalStatus: GlobalStatus) => (dispatch: Dispatch<CountDownAction>) => void
type TSaveState = (state: CountDownState) => (dispatch: Dispatch<CountDownAction>) => void
type TAction = () => (dispatch: Dispatch<CountDownAction>) => void

export const loadLocalState: TLoadSate = () => {
  return (dispatch: Dispatch<CountDownAction>) => {
    try {
      const storage = localStorage.getItem(CONFIG.localStorageKey);
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
      localStorage.setItem(CONFIG.localStorageKey, JSON.stringify(state));
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
      localStorage.removeItem(CONFIG.localStorageKey);
    } catch (e) {
      dispatch({
        type: ActionTypes.SAVE_STATE_ERROR,
        payload: 'Error Saving State To LocalStorage'
      })
    }
  }
}

