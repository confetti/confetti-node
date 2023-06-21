module.exports = function ({ presenters, Presenter }) {
  class WorkspacePresenter extends Presenter {}
  WorkspacePresenter.prototype.type = 'workspace'
  WorkspacePresenter.prototype.plural = 'workspaces'
  return WorkspacePresenter
}
