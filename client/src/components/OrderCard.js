import React, { useContext, useState } from 'react';
import '../App.css'
import { UserContext } from './context/User';
import OrderProductCard from './OrderProductCard';

function OrderCard({ orders, setOrders, order, products }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [errors, setErrors] = useState(false)
    const [formData, setFormData] = useState({
        status: "canceled"
    })
    const [fulfillFormData, setFulfillFormData] = useState({
        status: "fulfilled"
    })

    const currentProducts = products.filter(product => {
        if (product.order_id === order.id) {
            return product
        } else {
            return null
        }
    })

    const productMap = currentProducts.map(product => <OrderProductCard product={product} key={product.id}/>)

    function updateOrders(updatedOrder) {
        const updatingOrders = orders.map((currentOrder) => {
            if (currentOrder.id === order.id) {
                return updatedOrder
            } else {
                return currentOrder
            }
        })
        setOrders(updatingOrders)
    }

    function orderUpdate(e) {
        e.preventDefault()
        fetch(`orders/${order.id}`, {
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
                })
            } else {
              res.json().then(json => setErrors([json.errors]))
            }
    })}

    function onFulfill(e) {
        e.preventDefault()
        fetch(`orders/${order.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(fulfillFormData)
        }).then((res) => {
            if(res.ok){
              res.json()
              .then(order => {
                updateOrders(order)
                })
            } else {
              res.json().then(json => setErrors([json.errors]))
            }
    })}

    return (
        <div className='address'>
            {order.updated_at}
            <br/>
            <br/>
            {order.address.name}
            <br/>
            {order.address.street}
            <br/>
            {order.address.city}, {order.address.state} {order.address.zip}
            <br/>
            <br/>
            {productMap}
            Shipping: ${order.shipping}
            <br/>
            Total Cost: ${order.total}
            {order.status === "submitted" ? <div>
            <br/>
            <br/>
            <button onClick={orderUpdate}>Cancel Order</button></div> : null}
            <br/>
            { currentCustomer.admin && order.status !== "fulfilled" && order.status !== "canceled" ? <button onClick={onFulfill}>Fulfill Order</button> : null }
            { errors ? errors.map(error => <div className='error' key={error}>{error}</div>) :null }
        </div>
    )
}

export default OrderCard;