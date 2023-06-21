module.exports = function ({ presenters, Presenter }) {
  class ContactPresenter extends Presenter {
    attributes(contact) {
      if (contact.workspaceId) {
        contact.workspace = {
          id: contact.workspaceId,
        }
        delete contact.workspaceId
      }
      const s = super.attributes(contact)
      return s
    }
    relationships() {
      return {
        workspace: presenters.WorkspacePresenter,
      }
    }
  }
  ContactPresenter.type = 'contact'
  ContactPresenter.plural = 'contacts'
  return ContactPresenter
}
