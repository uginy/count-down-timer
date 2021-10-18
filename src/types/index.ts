export interface CountDownState {
  laps: CountDownLap[];
  globalState: GlobalState;
  initialTimer: number;
  error: null | string;
}

export enum LapStatus {
  LAP_PAUSED = 'LAP_PAUSED',
  LAP_RESUMED = 'LAP_RESUMED',
  LAP_STOPPED = 'LAP_STOPPED',
  LAP_STARTED = 'LAP_STARTED',
  LAP_MERGED = 'LAP_MERGED',
}

export enum GlobalState {
  INIT = 'INIT',
  PAUSED = 'PAUSED',
  RESUMED = 'RESUMED',
  STOPPED = 'STOPPED',
  STARTED = 'STARTED',
}

export interface CountDownLap {
  id: number;
  startTime: number;
  startDateTime: number;
  endDateTime?: number;
  duration?: number;
  status?: LapStatus;
}

export enum ActionTypes {
  SET_TIME = 'SET_TIME',
  LOAD_STATE = 'LOAD_STATE',
  LOAD_STATE_SUCCESS = 'LOAD_STATE_SUCCESS',
  LOAD_STATE_ERROR = 'LOAD_STATE_ERROR',
  SAVE_STATE = 'SAVE_STATE',
  SAVE_STATE_SUCCESS = 'SAVE_STATE_SUCCESS',
  SAVE_STATE_ERROR = 'SAVE_STATE_ERROR',

  INIT_COUNTER = 'INIT_COUNTER',
  START_COUNTER = 'START_COUNTER',
  RESET_COUNTER = 'RESET_COUNTER',
  STOP_COUNTER = 'STOP_COUNTER',
  PAUSE_COUNTER = 'PAUSE_COUNTER',
  RESUME_COUNTER = 'RESUME_COUNTER',
  UPDATE_COUNTER = 'UPDATE_COUNTER',
  MERGE_COUNTER = 'MERGE_COUNTER'
}

interface LoadStateAction {
  type: ActionTypes.LOAD_STATE
}

interface LoadStateSuccessAction {
  type: ActionTypes.LOAD_STATE_SUCCESS
  payload: CountDownState
}

interface LoadStateErrorAction {
  type: ActionTypes.LOAD_STATE_ERROR
  payload: string;
}

interface SaveStateAction {
  type: ActionTypes.SAVE_STATE
}

interface SaveStateSuccessAction {
  type: ActionTypes.SAVE_STATE_SUCCESS
}

interface SaveStateErrorAction {
  type: ActionTypes.SAVE_STATE_ERROR
  payload: string;
}

interface SetTimeAction {
  type: ActionTypes.SET_TIME
  payload: number;
}

interface ResetAction {
  type: ActionTypes.RESET_COUNTER
}

interface InitAction {
  type: ActionTypes.INIT_COUNTER
}

interface StartAction {
  type: ActionTypes.START_COUNTER
}

interface StopAction {
  type: ActionTypes.STOP_COUNTER
}

interface PauseAction {
  type: ActionTypes.PAUSE_COUNTER
}

interface ResumeAction {
  type: ActionTypes.RESUME_COUNTER
}

interface MergeAction {
  type: ActionTypes.MERGE_COUNTER
}

interface UpdateAction {
  type: ActionTypes.UPDATE_COUNTER
}

export type CountDownAction =
  | SetTimeAction
  | LoadStateAction
  | LoadStateSuccessAction
  | LoadStateErrorAction
  | SaveStateAction
  | SaveStateSuccessAction
  | SaveStateErrorAction
  | StartAction
  | InitAction
  | ResetAction
  | StopAction
  | PauseAction
  | ResumeAction
  | MergeAction
  | UpdateAction
