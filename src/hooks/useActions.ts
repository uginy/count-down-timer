import {useDispatch} from 'react-redux';
import {ActionCreator, bindActionCreators} from 'redux';
import {ActionCreators} from '../store/action-creators/'

// eslint-disable-next-line
export const useActions: ActionCreator<any> = () => {
  const dispatch = useDispatch()
  return bindActionCreators(ActionCreators, dispatch)
}
