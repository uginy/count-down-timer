import {combineReducers} from 'redux';
import {countdownReducer} from './countdown.reducer';


export const rootReducer = combineReducers({
  countDown: countdownReducer
})

export type RootState = ReturnType<typeof rootReducer>
