import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm: React.FC = () => { 
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<undefined | string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);

  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:max-w-xl lg:p-8">
      <PaymentElement id="payment-element" />
      <div className="flex  items-center justify-center">
      <button disabled={isProcessing || !stripe || !elements} id="submit" className="flex items-center justify-center bg-green-600 rounded-md px-5 mt-4 text-md font-medium text-white border-2 border-black-800">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
      </div>
    </form>
  );
}

export default CheckoutForm;