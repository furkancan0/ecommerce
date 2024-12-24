import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";

const Payment: React.FC = () => {
  const [stripePromise, setStripePromise] = useState<any>();
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:8050/api/checkout/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8050/api/checkout/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <div className="flex items-center justify-center flex-col text-lg bg-gray-50 md:h-screen w-1/2  sm:w-full  lg:py-0">
      <div className="flex ">
        <svg className="mt-2 mr-1" enableBackground="new 0 0 48 48" height="48px" id="Layer_1" version="1.1" viewBox="0 0 48 48" width="48px" xmlns="http://www.w3.org/2000/svg" ><path clipRule="evenodd" d="M43,40H5c-2.209,0-4-1.791-4-4V12c0-2.209,1.791-4,4-4h38c2.209,0,4,1.791,4,4v24  C47,38.209,45.209,40,43,40z M3,21h42v-4H3V21z M45,12c0-1.104-0.896-2-2-2H5c-1.104,0-2,0.896-2,2v3h42V12z M45,23H3v13  c0,1.104,0.896,2,2,2h38c1.104,0,2-0.896,2-2V23z M26,29h-4c-0.553,0-1-0.447-1-1c0-0.552,0.447-1,1-1h4c0.553,0,1,0.448,1,1  C27,28.553,26.553,29,26,29z M17,29H8c-0.553,0-1-0.447-1-1c0-0.552,0.447-1,1-1h9c0.553,0,1,0.448,1,1C18,28.553,17.553,29,17,29z   M8,32h6c0.553,0,1,0.448,1,1c0,0.553-0.447,1-1,1H8c-0.553,0-1-0.447-1-1C7,32.448,7.447,32,8,32z" fillRule="evenodd"/></svg>
        <div className="mt-5">$Payment</div>
      </div>  
        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        )}
    </div>
  );
}

export default Payment;