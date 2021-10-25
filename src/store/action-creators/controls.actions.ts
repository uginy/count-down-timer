import {Dispatch} from 'redux';
import {ActionTypes, CountDownAction} from '../../types';

type TAction = () => (dispatch: Dispatch<CountDownAction>) => void
type TUpdateAction = (time: number) => (dispatch: Dispatch<CountDownAction>) => void

export const resetCounter: TAction = () => {
  return (dispatch: Dispatch<CountDownAction>) => {
    dispatch({type: ActionTypes.RESET_COUNTER})
    dispatch({type: ActionTypes.INIT_COUNTER})
  }
}

export const initCounter: TAction = () => {
  return (dispatch: Dispatch<CountDownAction>) => {
    dispatch({type: ActionTypes.INIT_COUNTER})
  }
}

export const startCounter: TAction = () => {
  return (dispatch: Dispatch<CountDownAction>) => {
    dispatch({type: ActionTypes.START_COUNTER})
  }
}

export const startedCounter: TUpdateAction = (time: number) => {
  return (dispatch: Dispatch<CountDownAction>) => {
    dispatch({type: ActionTypes.STARTED_COUNTER, payload: time})
  }
}

export const stopCounter: TAction = () => {
  return (dispatch: Dispatch<CountDownAction>) => {
    dispatch({type: ActionTypes.STOP_COUNTER})
  }
}

export const stoppedCounter: TUpdateAction = (time: number) => {
  return (dispatch: Dispatch<CountDownAction>) => {
    dispatch({type: ActionTypes.STOPPED_COUNTER, payload: time})
  }
}

export const pauseCounter: TAction = () => {
  return (dispatch: Dispatch<CountDownAction>) => {
    dispatch({type: ActionTypes.PAUSE_COUNTER})
  }
}

export const resumeCounter: TAction = () => {
  return (dispatch: Dispatch<CountDownAction>) => {
    dispatch({type: ActionTypes.RESUME_COUNTER})
  }
}

export const mergeCounter: TAction = () => {
  return (dispatch: Dispatch<CountDownAction>) => {
    dispatch({type: ActionTypes.MERGE_COUNTER})
  }
}

export const mergedCounter: TUpdateAction = (time: number) => {
  return (dispatch: Dispatch<CountDownAction>) => {
    dispatch({type: ActionTypes.MERGED_COUNTER, payload: time})
  }
}

export const updatedCounter: TUpdateAction = (time: number) => {
  return (dispatch: Dispatch<CountDownAction>) => {
    dispatch({type: ActionTypes.UPDATED_COUNTER, payload: time})
  }
}
