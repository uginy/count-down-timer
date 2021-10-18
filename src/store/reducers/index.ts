import {combineReducers} from 'redux';
import {countDownReducer} from './countDownReducer';

export const rootReducer = combineReducers({
  countDown: countDownReducer
})

export type RootState = ReturnType<typeof rootReducer>
