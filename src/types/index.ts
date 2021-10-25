export interface CountDownState {
  laps: CountDownLap[];
  globalStatus: GlobalStatus;
  initialTimer: number;
  error: null | string;
}

export enum LapStatus {
  LAP_PAUSED = 'LAP_PAUSED',
  LAP_RESUMED = 'LAP_RESUMED',
  LAP_STOPPED = 'LAP_STOPPED',
  LAP_STARTED = 'LAP_STARTED',
  LAP_MERGED = 'LAP_MERGED',
  LAP_STARTED_MERGED = 'LAP_STARTED_MERGED',
  LAP_CREATED = 'LAP_CREATED',
  LAP_LOADED = 'LAP_LOADED'
}

export enum GlobalStatus {
  INIT = 'INIT',
  PAUSED = 'PAUSED',
  RESUMED = 'RESUMED',
  STOPPED = 'STOPPED',
  STARTED = 'STARTED',
  LOADED = 'LOADED',
  SAVED = 'SAVED',
}

export interface CountDownLap {
  id: number;
  startTime: number;
  endTime: number;
  currentTime: number;
  duration?: number;
  status?: LapStatus;
}

export enum ActionTypes {
  SET_TIME = 'SET_TIME',

  INIT_COUNTER = 'INIT_COUNTER',
  RESET_COUNTER = 'RESET_COUNTER',

  LOAD_STATE = 'LOAD_STATE',
  LOAD_STATE_SUCCESS = 'LOAD_STATE_SUCCESS',
  LOAD_STATE_ERROR = 'LOAD_STATE_ERROR',

  SAVE_STATE = 'SAVE_STATE',
  SAVE_STATE_SUCCESS = 'SAVE_STATE_SUCCESS',
  SAVE_STATE_ERROR = 'SAVE_STATE_ERROR',

  START_COUNTER = 'START_COUNTER',
  STARTED_COUNTER = 'STARTED_COUNTER',

  STOP_COUNTER = 'STOP_COUNTER',
  STOPPED_COUNTER = 'STOPPED_COUNTER',

  PAUSE_COUNTER = 'PAUSE_COUNTER',
  PAUSED_COUNTER = 'PAUSED_COUNTER',

  RESUME_COUNTER = 'RESUME_COUNTER',
  RESUMED_COUNTER = 'RESUMED_COUNTER',

  MERGE_COUNTER = 'MERGE_COUNTER',
  MERGED_COUNTER = 'MERGED_COUNTER',

  UPDATED_COUNTER = 'UPDATED_COUNTER',
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
  payload: CountDownState
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

interface StartedAction {
  type: ActionTypes.STARTED_COUNTER
  payload: number
}

interface StopAction {
  type: ActionTypes.STOP_COUNTER
}

interface StoppedAction {
  type: ActionTypes.STOPPED_COUNTER
  payload: number
}

interface PauseAction {
  type: ActionTypes.PAUSE_COUNTER
}

interface PausedAction {
  type: ActionTypes.PAUSED_COUNTER
  payload: number
}

interface ResumeAction {
  type: ActionTypes.RESUME_COUNTER
}

interface ResumedAction {
  type: ActionTypes.RESUMED_COUNTER
  payload: number
}

interface MergeAction {
  type: ActionTypes.MERGE_COUNTER
}

interface MergedAction {
  type: ActionTypes.MERGED_COUNTER,
  payload: number;
}

interface UpdatedAction {
  type: ActionTypes.UPDATED_COUNTER,
  payload: number;
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
  | StoppedAction
  | PauseAction
  | PausedAction
  | ResumeAction
  | ResumedAction
  | UpdatedAction
  | StartedAction
  | MergeAction
  | MergedAction
