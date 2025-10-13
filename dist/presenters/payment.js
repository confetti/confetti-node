export default function ({ Presenter }) {
    class PaymentPresenterClass extends Presenter {
    }
    PaymentPresenterClass.type = 'payment';
    PaymentPresenterClass.plural = 'payments';
    return PaymentPresenterClass;
}
