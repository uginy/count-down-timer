import {ActionTypes, CountDownAction, CountDownLap, CountDownState, GlobalState, LapStatus} from '../../types';
import {settings} from '../../consts';

const initialState: CountDownState = {
  globalState: GlobalState.INIT,
  laps: [],
  initialTimer: settings.defaultInitialTime,
  error: null
}

const lastLap = (laps: CountDownLap[]): CountDownLap => laps.length > 0 ? laps[laps.length - 1] : laps[0]

export const countdownReducer = (state = initialState, action: CountDownAction): CountDownState => {
  const laps = [...state.laps];

  switch (action.type) {
    case ActionTypes.SET_TIME:
      return {...state, initialTimer: action.payload}

    case ActionTypes.LOAD_STATE_SUCCESS: {
      lastLap(action.payload.laps).status = LapStatus.LAP_LOADED
      return {...action.payload, error: null, globalState: GlobalState.LOADED}
    }

    case ActionTypes.LOAD_STATE_ERROR:
      return {...state, laps: [], error: action.payload}

    case ActionTypes.SAVE_STATE: {
      return {...state, error: null, globalState: GlobalState.SAVED}
    }

    case ActionTypes.SAVE_STATE_SUCCESS: {
      return {...state, error: null, globalState: GlobalState.STARTED}
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
      return {...state, laps, globalState: GlobalState.STARTED}
    }

    case ActionTypes.START_COUNTER: {
      lastLap(laps).status = LapStatus.LAP_CREATED
      return {...state, laps, globalState: GlobalState.STARTED}
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
      return {...state, laps: [...laps, newLap], globalState: GlobalState.STARTED}
    }

    case ActionTypes.STOP_COUNTER: {
      const laps = state.laps.map(el => ({...el, status: LapStatus.LAP_STOPPED}));
      return {...state, laps, globalState: GlobalState.STOPPED}
    }

    case ActionTypes.STOPPED_COUNTER: {
      const laps = state.laps.map(el => ({...el, status: LapStatus.LAP_STOPPED}));
      if (state.laps.length > 0) {
        lastLap(laps).duration = lastLap(laps).startTime - Math.abs(action.payload)
        lastLap(laps).endTime = action.payload
      }
      return {...state, laps, globalState: GlobalState.STOPPED}
    }

    case ActionTypes.PAUSE_COUNTER: {
      lastLap(laps).status = LapStatus.LAP_PAUSED
      return {...state, laps, globalState: GlobalState.PAUSED}
    }

    case ActionTypes.PAUSED_COUNTER: {
      lastLap(laps).endTime = action.payload
      lastLap(laps).duration = lastLap(laps).startTime - Math.abs(action.payload)
      return {...state, laps, globalState: GlobalState.PAUSED}
    }

    case ActionTypes.RESUME_COUNTER: {
      lastLap(laps).status = LapStatus.LAP_RESUMED
      return {...state, laps, globalState: GlobalState.RESUMED}
    }

    case ActionTypes.RESUMED_COUNTER: {
      lastLap(laps).endTime = action.payload
      lastLap(laps).duration = lastLap(laps).startTime - Math.abs(action.payload)

      return {...state, laps, globalState: GlobalState.RESUMED}
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
      return {...state, laps, globalState: GlobalState.STARTED}
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
