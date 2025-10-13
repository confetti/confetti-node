export default function ({ Presenter }) {
    class WorkspacePresenterClass extends Presenter {
    }
    WorkspacePresenterClass.type = 'workspace';
    WorkspacePresenterClass.plural = 'workspaces';
    return WorkspacePresenterClass;
}
