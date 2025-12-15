import { PresenterOptions, WorkspacePresenter } from '../types/presenters.js'

export default function ({ Presenter }: PresenterOptions): WorkspacePresenter {
  class WorkspacePresenterClass extends Presenter {
    static type = 'workspace' as const
    static plural = 'workspaces' as const
  }

  return WorkspacePresenterClass
}
