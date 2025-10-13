export default function ({ presenters, Presenter }) {
    class ContactPresenterClass extends Presenter {
        attributes(contact) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const contactData = contact;
            if (contactData.workspaceId) {
                contactData.workspace = {
                    id: contactData.workspaceId,
                };
                delete contactData.workspaceId;
            }
            if (contactData.categoryIds?.length) {
                contactData.categories = contactData.categoryIds.map((id) => ({
                    id,
                }));
                delete contactData.categoryIds;
            }
            const s = super.attributes?.(contactData) || contactData;
            return s;
        }
        relationships() {
            return {
                workspace: presenters.WorkspacePresenter,
                categories: presenters.CategoryPresenter,
            };
        }
    }
    ContactPresenterClass.type = 'contact';
    ContactPresenterClass.plural = 'contacts';
    return ContactPresenterClass;
}
