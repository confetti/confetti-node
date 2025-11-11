import { PresenterOptions, PaymentPresenter } from '../types/presenters.js'

export default function ({ Presenter }: PresenterOptions): PaymentPresenter {
  class PaymentPresenterClass extends Presenter {
    static type = 'payment' as const
    static plural = 'payments' as const
  }

  return PaymentPresenterClass
}
