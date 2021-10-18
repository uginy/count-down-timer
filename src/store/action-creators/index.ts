import * as LocalStorageActionCreators from './LocalStorageActionCreator'
import * as InitialActionCreator from './InitialActionCreator'
import * as ControlsActionCreator from './ControlsActionCreator'

export const ActionCreators = {
  ...LocalStorageActionCreators,
  ...InitialActionCreator,
  ...ControlsActionCreator
}
