import React, { useState, useRef, useEffect } from 'react';

function PayPal( { cart })  {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();

    console.log("Isnide Paypal component");
    console.table(cart);


    useEffect(() => {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [ //Put cart content array creation here
                {
                  description: "DESCRIPTION", //Change
                  amount: {
                    currency_code: 'CAD',
                    value: '1.00', //Change
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            setPaidFor(true);
            console.log(order);
          },
          onError: err => {
            setError(err);
            console.error(err);
          },
        })
        .render(paypalRef.current);
    }, [cart]);
  
    if (paidFor) {
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