import React, { useEffect, useState } from 'react'

function Success({ orderId, orders, setOrders, setProductCount, setOrder }) {
  const [errors, setErrors] = useState([])
  const [formData, setFormData] = useState({
    status: "submitted" 
})

  useEffect(() => {
   const functionCalling = orderId && orders.length !== 0 ? orderUpdate(orderId) : null
  }, [orderId, orders.length])

  function updateOrders(updatedOrder) {
    const updatingOrders = orders.map(currentOrder => {
        if (currentOrder.id === orderId) {
            return updatedOrder
        } else {
            return currentOrder
        }
    })
    setOrders(updatingOrders)
}

  function orderUpdate() {
    fetch(`orders/${orderId}`, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify(formData)
    }).then((res) => {
        if(res.ok){
          res.json()
          .then(order => {
            updateOrders(order)
            setProductCount(0)
            setOrder([])
            })
        } else {
          res.json().then(json => setErrors(json.errors))
        }
})}

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