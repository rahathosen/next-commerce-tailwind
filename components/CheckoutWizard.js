import React from "react";

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="mx-5 mb-5 flex flex-wrap py-5 xs:mx-5">
      {["User Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-2  
          text-center 
       ${
         index <= activeStep
           ? "border-teal-600   text-teal-600"
           : "border-gray-400 text-gray-400"
       }
          
       `}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
}
