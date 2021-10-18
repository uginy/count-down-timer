import {useDispatch} from 'react-redux';
import {ActionCreator, bindActionCreators} from 'redux';
import {ActionCreators} from '../store/action-creators/'
import {AppDispatch} from '../store';

export const useActions: ActionCreator<typeof ActionCreators> = () => {
  const dispatch = useDispatch<AppDispatch>()
  return bindActionCreators(ActionCreators, dispatch)
}
