import * as LocalStorageActionCreators from './local-storage.actions'
import * as InitialActionCreator from './init.actions'
import * as ControlsActionCreator from './controls.actions'

export const ActionCreators = {
  ...LocalStorageActionCreators,
  ...InitialActionCreator,
  ...ControlsActionCreator
}
