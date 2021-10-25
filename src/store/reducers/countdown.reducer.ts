import {ActionTypes, CountDownAction, CountDownLap, CountDownState, GlobalStatus, LapStatus} from '../../types';
import {CONFIG} from '../../constants';

const defaultLap = {
  id: 0,
  startTime: CONFIG.defaultInitialTime,
  endTime: CONFIG.defaultInitialTime,
  currentTime: CONFIG.defaultInitialTime,
  status: LapStatus.LAP_STARTED
}

const initialState: CountDownState = {
  globalStatus: GlobalStatus.INIT,
  laps: [],
  initialTimer: CONFIG.defaultInitialTime,
  error: null
}

const lastLap = (laps: CountDownLap[]): CountDownLap => laps.length > 0 ? laps[laps.length - 1] : defaultLap

export const countdownReducer = (state = initialState, action: CountDownAction): CountDownState => {
  const laps = [...state.laps];

  switch (action.type) {
    case ActionTypes.SET_TIME:
      return {...state, initialTimer: action.payload}

    case ActionTypes.LOAD_STATE_SUCCESS: {
      lastLap(action.payload.laps).status = LapStatus.LAP_LOADED
      return {...action.payload, error: null, globalStatus: GlobalStatus.LOADED}
    }

    case ActionTypes.LOAD_STATE_ERROR:
      return {...state, laps: [], error: action.payload}

    case ActionTypes.SAVE_STATE: {
      return {...state, error: null, globalStatus: GlobalStatus.SAVED}
    }

    case ActionTypes.SAVE_STATE_SUCCESS: {
      return {...state, error: null, globalStatus: GlobalStatus.STARTED}
    }

    case ActionTypes.SAVE_STATE_ERROR:
      return {...state, error: action.payload}

    case ActionTypes.RESET_COUNTER:
      return {...state, laps: []}

    case ActionTypes.INIT_COUNTER: {
      const laps: CountDownLap[] = [{
        id: 0,
        startTime: state.initialTimer,
        endTime: state.initialTimer,
        currentTime: state.initialTimer,
        status: LapStatus.LAP_STARTED
      }]
      return {...state, laps, globalStatus: GlobalStatus.STARTED}
    }

    case ActionTypes.START_COUNTER: {
      lastLap(laps).status = LapStatus.LAP_CREATED
      return {...state, laps, globalStatus: GlobalStatus.STARTED}
    }

    case ActionTypes.STARTED_COUNTER: {
      if (state.laps.length > 0) {
        const currentLap = lastLap(laps)
        currentLap.status = LapStatus.LAP_PAUSED;
        currentLap.endTime = action.payload
        currentLap.currentTime = action.payload
        currentLap.duration = currentLap.startTime - Math.abs(currentLap.endTime)
      }

      const newLap: CountDownLap = {
        id: state.laps.length,
        startTime: action.payload,
        endTime: action.payload,
        currentTime: lastLap(laps).endTime,
        status: LapStatus.LAP_STARTED
      }
      return {...state, laps: [...laps, newLap], globalStatus: GlobalStatus.STARTED}
    }

    case ActionTypes.STOP_COUNTER: {
      const laps = state.laps.map(el => ({...el, status: LapStatus.LAP_STOPPED}));
      return {...state, laps, globalStatus: GlobalStatus.STOPPED}
    }

    case ActionTypes.STOPPED_COUNTER: {
      const laps = state.laps.map(el => ({...el, status: LapStatus.LAP_STOPPED}));
      if (state.laps.length > 0) {
        lastLap(laps).duration = lastLap(laps).startTime - Math.abs(action.payload)
        lastLap(laps).endTime = action.payload
      }
      return {...state, laps, globalStatus: GlobalStatus.STOPPED}
    }

    case ActionTypes.PAUSE_COUNTER: {
      lastLap(laps).status = LapStatus.LAP_PAUSED
      return {...state, laps, globalStatus: GlobalStatus.PAUSED}
    }

    case ActionTypes.PAUSED_COUNTER: {
      lastLap(laps).endTime = action.payload
      lastLap(laps).duration = lastLap(laps).startTime - Math.abs(action.payload)
      return {...state, laps, globalStatus: GlobalStatus.PAUSED}
    }

    case ActionTypes.RESUME_COUNTER: {
      lastLap(laps).status = LapStatus.LAP_RESUMED
      return {...state, laps, globalStatus: GlobalStatus.RESUMED}
    }

    case ActionTypes.RESUMED_COUNTER: {
      lastLap(laps).endTime = action.payload
      lastLap(laps).duration = lastLap(laps).startTime - Math.abs(action.payload)

      return {...state, laps, globalStatus: GlobalStatus.RESUMED}
    }

    case ActionTypes.MERGE_COUNTER: {
      laps.length > 1 && (lastLap(laps).status = LapStatus.LAP_MERGED)
      return {...state, laps}
    }

    case ActionTypes.MERGED_COUNTER: {
      laps.pop();
      delete lastLap(laps).duration;
      lastLap(laps).currentTime = action.payload
      lastLap(laps).endTime = action.payload
      lastLap(laps).status = LapStatus.LAP_STARTED_MERGED
      return {...state, laps, globalStatus: GlobalStatus.STARTED}
    }

    case ActionTypes.UPDATED_COUNTER: {
      lastLap(laps).endTime = action.payload
      lastLap(laps).currentTime = action.payload
      lastLap(laps).duration = lastLap(laps).startTime - Math.abs(action.payload)
      return {...state, laps}
    }
    default:
      return state
  }
}
