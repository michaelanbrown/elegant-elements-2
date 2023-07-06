import React, { useEffect } from 'react'


function Success({ orderUpdate, orderId }) {

  useEffect(() => {
    orderUpdate(orderId)
  }, [orderId])

  return (
    <div>
        <br/>
        <br/>
        <span className="checkMark">✓</span>
        <h1>Thank you for your order!</h1>
        <h4>Your order has been placed and is being processed.</h4>
        <p>You will recieve your receipt within 1 business day.</p>
    </div>
  );
}

export default Success;