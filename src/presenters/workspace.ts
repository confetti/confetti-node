import { PresenterOptions, WorkspacePresenter } from '../types/presenters.js'

export default function ({ Presenter }: PresenterOptions): WorkspacePresenter {
  class WorkspacePresenterClass extends Presenter {}

  WorkspacePresenterClass.type = 'workspace'
  WorkspacePresenterClass.plural = 'workspaces'

  return WorkspacePresenterClass as unknown as WorkspacePresenter
}
