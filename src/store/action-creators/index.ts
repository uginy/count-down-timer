import * as LocalStorageActionCreators from './local-storage.ac'
import * as InitialActionCreator from './init.ac'
import * as ControlsActionCreator from './controls.ac'

export const ActionCreators = {
  ...LocalStorageActionCreators,
  ...InitialActionCreator,
  ...ControlsActionCreator
}
