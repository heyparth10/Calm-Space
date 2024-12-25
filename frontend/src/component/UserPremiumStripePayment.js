import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {PaymentElement} from '@stripe/react-stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
};

export default function UserPremiumStripePayment() {
    const options = {
      // passing the client secret obtained from the Stripe Dashboard
      clientSecret: '{{sk_test_51Ox2A5SJnzZ1eVquxbCj09naNsvZ4ERKVGdTC4PcCYG6JXcybjxnR8At0YgduqN4rFwExujiXCVVIv7iuySohf6V00l2879ldQ}}',
    };
  
    return (
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    );
  };