export default function ({ Presenter }) {
    class CategoryPresenterClass extends Presenter {
    }
    CategoryPresenterClass.type = 'category';
    CategoryPresenterClass.plural = 'categories';
    return CategoryPresenterClass;
}
