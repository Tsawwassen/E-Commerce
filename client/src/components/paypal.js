import React, { useState, useRef, useEffect } from 'react';

function PayPal( { due, onSuccess })  {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();

    useEffect(() => {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [ //It looks like you could let paypal calculate the amount due by adding to this array, but just putting in one line item for this project
                {
                  description: "ECommerce Order", 
                  amount: {
                    currency_code: 'CAD',
                    value: due, 
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            setPaidFor(true);
            console.log(order);
            onSuccess(order);
          },
          onError: err => {
            setError(err);
            console.error(err);
          },
        })
        .render(paypalRef.current);
    }, [due, onSuccess]);
  
    if (paidFor) {
   
      //Inside, here change view and post order to backend
      return (
        <div>
          <h1>Congrats, you just bought !</h1>
          
        </div>
      );
    }
    return (<div>
                {error && <div>Uh oh, an error occurred! {error.message}</div>}
                <h1>Paypal</h1>
                <div ref={paypalRef} />
            </div>);
    // return (
    //   <div>
    //     {error && <div>Uh oh, an error occurred! {error.message}</div>}
    //     <h1>
    //       {product.description} for ${product.price}
    //     </h1>
    //     <img alt={product.description} src={product.image} width="200" />
    //     <div ref={paypalRef} />
    //   </div>
    // );
  }
  

  export default PayPal;