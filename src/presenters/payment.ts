import { PresenterOptions, PaymentPresenter } from '../types/presenters.js'

export default function ({ Presenter }: PresenterOptions): PaymentPresenter {
  class PaymentPresenterClass extends Presenter {}

  PaymentPresenterClass.type = 'payment'
  PaymentPresenterClass.plural = 'payments'

  return PaymentPresenterClass as unknown as PaymentPresenter
}
