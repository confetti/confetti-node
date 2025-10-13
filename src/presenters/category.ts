import { PresenterOptions, CategoryPresenter } from '../types/presenters.js'

export default function ({ Presenter }: PresenterOptions): CategoryPresenter {
  class CategoryPresenterClass extends Presenter {}

  CategoryPresenterClass.type = 'category'
  CategoryPresenterClass.plural = 'categories'

  return CategoryPresenterClass as unknown as CategoryPresenter
}
