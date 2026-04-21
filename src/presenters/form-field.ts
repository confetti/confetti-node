import { PresenterOptions, FormFieldPresenter } from '../types/presenters.js'

export default function ({ Presenter }: PresenterOptions): FormFieldPresenter {
  class FormFieldPresenterClass extends Presenter {
    static type = 'formField' as const
    static plural = 'formFields' as const
  }

  return FormFieldPresenterClass
}
