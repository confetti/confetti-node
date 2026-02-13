import { PresenterOptions, AddonPresenter } from '../types/presenters.js'

export default function ({ Presenter }: PresenterOptions): AddonPresenter {
  class AddonPresenterClass extends Presenter {
    static type = 'addon' as const
    static plural = 'addons' as const
  }

  return AddonPresenterClass
}
