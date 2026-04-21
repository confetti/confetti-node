import { PresenterOptions, FormPresenter } from '../types/presenters.js'

export default function ({ Presenter }: PresenterOptions): FormPresenter {
  class FormPresenterClass extends Presenter {
    static type = 'form' as const
    static plural = 'forms' as const
  }

  return FormPresenterClass
}
