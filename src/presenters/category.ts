import { PresenterOptions, CategoryPresenter } from '../types/presenters.js'

export default function ({ Presenter }: PresenterOptions): CategoryPresenter {
  class CategoryPresenterClass extends Presenter {
    static type = 'category' as const
    static plural = 'categories' as const
  }

  return CategoryPresenterClass
}
