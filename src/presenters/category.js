module.exports = function ({ presenters, Presenter }) {
  class CategoryPresenter extends Presenter {}
  CategoryPresenter.prototype.type = 'category'
  CategoryPresenter.prototype.plural = 'categories'
  return CategoryPresenter
}
