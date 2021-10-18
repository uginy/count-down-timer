import {ActionTypes, CountDownAction, CountDownLap, CountDownState, LapStatus} from '../../types';
import {settings} from '../../consts';

const initialState: CountDownState = {
  laps: [],
  initialTimer: settings.defaultInitialTime,
  error: null
}

export const countDownReducer = (state = initialState, action: CountDownAction): CountDownState => {
  switch (action.type) {
    case ActionTypes.SET_TIME:
      return {...state, initialTimer: action.payload}

    case ActionTypes.LOAD_STATE:
      return {...state}
    case ActionTypes.LOAD_STATE_SUCCESS:
      return {...state, laps: action.payload}
    case ActionTypes.LOAD_STATE_ERROR:
      return {...state, error: action.payload}

    case ActionTypes.SAVE_STATE:
      return {...state}
    case ActionTypes.SAVE_STATE_SUCCESS:
      return {...state}
    case ActionTypes.SAVE_STATE_ERROR:
      return {...state, error: action.payload}

    case ActionTypes.RESET_COUNTER:
      return {...state, laps: []}

    case ActionTypes.INIT_COUNTER: {
      const newLap: CountDownLap = {
        id: 0,
        startTime: state.initialTimer,
        startDateTime: new Date().getTime(),
        status: LapStatus.LAP_STARTED
      }
      return {...state, laps: [newLap]}
    }

    case ActionTypes.START_COUNTER: {
      const laps = [...state.laps];

      if (state.laps.length > 0) {
        laps[laps.length - 1].status = LapStatus.LAP_PAUSED;
        laps[laps.length - 1].endDateTime = new Date().getTime()
        laps[laps.length - 1].duration = Math.abs(laps[laps.length - 1].startDateTime - new Date().getTime());
      }
      const startTime = (laps[laps.length - 1]?.startTime || state.initialTimer) - (laps[laps.length - 1]?.duration || 0);
      const newLap: CountDownLap = {
        id: state.laps.length,
        startTime,
        startDateTime: new Date().getTime(),
        status: LapStatus.LAP_STARTED
      }
      return {...state, laps: [...laps, newLap]}
    }

    case ActionTypes.STOP_COUNTER: {
      const laps = state.laps.map(el => ({...el, status: LapStatus.LAP_STOPPED}));
      if (state.laps.length > 0) {
        laps[laps.length - 1].endDateTime = new Date().getTime()
        laps[laps.length - 1].duration = Math.abs(laps[laps.length - 1].startDateTime - new Date().getTime());
      }
      return {...state, laps}
    }

    case ActionTypes.PAUSE_COUNTER: {
      const laps = state.laps.map(el => ({...el, status: LapStatus.LAP_PAUSED}));
      return {...state, laps}
    }

    case ActionTypes.RESUME_COUNTER: {
      const laps = [...state.laps];
      laps[laps.length - 1].status = LapStatus.LAP_RESUMED
      return {...state, laps}
    }

    case ActionTypes.MERGE_COUNTER: {
      const laps = [...state.laps]
      if (laps.length > 1) {
        laps[laps.length - 1].duration = Math.abs(laps[laps.length - 1].startDateTime - new Date().getTime());
        const removedLap = laps.pop()
        if (removedLap) {
          laps[laps.length - 1].startTime -= removedLap.startTime || 0;
          delete laps[laps.length - 1].endDateTime;
          laps[laps.length - 1].status = LapStatus.LAP_MERGED
        }
      }
      return {...state, laps: [...laps]}
    }

    case ActionTypes.UPDATE_COUNTER:
      return {...state}

    default:
      return state
  }
}
