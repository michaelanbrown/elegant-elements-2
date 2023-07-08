import React, { useEffect, useState } from 'react';
import '../App.css'
import ProductCartCard from './ProductCartCard';
import { Elements, useStripe } from '@stripe/react-stripe-js';

function Cart({ stripePromise, products, custAddresses, order, setOrder, orders, custProducts, setCustProducts, setOrders, productOrders, productCount, setProductCount }) {
    const [orderTotalAddition, setOrderTotalAddition] = useState(0)
    const [errors, setErrors] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const [addressData, setAddressData] = useState({
        address_id: ""
    })
    const shippingStripe = {
        stripe_key: "price_1NMgq2K92FCM7B9Ez1ZejOIO",
        quantity: 1
    }
    useEffect(() => {
        const identification = order && order[0] ? setOrderId(order[0].id) : null
        const orderSetting = order && order[0] ? setOrder(order[0]) : null
    }, [order])

    // const CheckoutForm = () => {
    //     const orderProducts = []
    //     const orderFinalSetting = order.product_orders ? order.product_orders.map(prodOrder => {
    //         const prod = {
    //             stripe_key: products.filter(product => product.id === prodOrder.product_id)[0].stripe_key,
    //             quantity: prodOrder.quantity
    //         }
    //         orderProducts.push(prod)
    //     }) : null
        
    //     const stripe = useStripe();

    //     const checkout = async(e) => {
    //         e.preventDefault()
    //         const res = await fetch('/checkout', {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({items: [...orderProducts, shippingStripe]})
    //         })
    //         const json = await res.json();
    //         if (res.ok) {
    //             window.location.assign(json.url)
    //             orderAddressUpdate()
    //         }
    //     }
    //     return (
    //         <form onSubmit={checkout}>
    //             <button type="submit" disabled={!stripe}>
    //                 Submit Order
    //             </button>
    //         </form>
    //     )
    // }

    const CheckoutForm = () => {
        const orderProducts = []
        const orderFinalSetting = order.product_orders ? order.product_orders.map(prodOrder => {
            const prod = {
                stripe_key: products.filter(product => product.id === prodOrder.product_id)[0].stripe_key,
                quantity: prodOrder.quantity
            }
            orderProducts.push(prod)
        }) : null
        
        const stripe = useStripe();

        const checkout = async(e) => {
            e.preventDefault()
            const res = await fetch('/checkout', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({items: [...orderProducts, shippingStripe]})
            })
            const json = await res.json();
            if (res.ok) {
                window.location.assign(json.url)
                orderAddressUpdate()
            }
        }
        return (
            <form onSubmit={checkout}>
                <button type="submit" disabled={!stripe}>
                    Submit Order
                </button>
            </form>
        )
    }

    const productMap = order.product_orders && order ? order.product_orders.map(product_order => <ProductCartCard products={products} order={order} setOrder={setOrder} custProducts={custProducts} setCustProducts={setCustProducts} product_order={product_order} key={product_order.id} productCount={productCount} setProductCount={setProductCount} orders={orders} setOrders={setOrders} productOrders={productOrders} orderTotalAddition={orderTotalAddition} setOrderTotalAddition={setOrderTotalAddition}/>) : null

    const addressOptions = custAddresses ? custAddresses.map(option => {
        return (<option id="addressSelected" className="addressOption" value={option.id} key={option.id}>{option.name}{" "}-{" "}{option.street}{" "}{option.unit ? option.unit : null},{" "}{option.city}, {option.state} {option.zip}</option>)
    }) : null

    function handleTypeChange(e) {
        setAddressData({
            address_id: document.getElementById("addressSelected").value
        });
    }

    function updateOrders(updatedOrder) {
        const updatingOrders = orders.map((currentOrder) => {
            if (currentOrder.id === orderId) {
                return updatedOrder
            } else {
                return currentOrder
            }
        })
        setOrders(updatingOrders)
    }

    function deletingOrder(order) {
        const deletingOrder = orders.filter((ord) => {
            if (ord.id !== order.id) {
                return order
            }
        })
        setOrders(deletingOrder)
    }

        function orderAddressUpdate() {
        fetch(`orders/${order.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(addressData)
        }).then((res) => {
            if(res.ok){
              res.json()
              .then(order => {
                updateOrders(order)
                })
            } else {
              res.json().then(json => console.log(json.errors))
            }
    })}

    function deleteOrder() {
        fetch(`orders/${order.id}`, {
            method:"DELETE"
        })
        .then(res =>{
          if(res.ok){
            setProductCount(0)
            setOrder([])
            deletingOrder(order)
          }
        })
    }

    return (
        order.products ?
        <div>
                <h1>Current Cart</h1>
                    { productMap ? productMap : null }
                    <br/>
                    <br/>
                    <p>Flat Rate Shipping: ${ order ? order.shipping : null}</p>
                    <p>Order Total: ${ order ? order.total + orderTotalAddition : null}</p>
                    <form>
                        Select the Shipping Address:
                        <br/>
                        <select className="addressselect" onChange={handleTypeChange}>
                            <option key="blank" value={" "}>{"Select the shipping Address"}</option>
                            {addressOptions}
                        </select>
                        <br/>
                    </form> 
                        <br/>
                        { errors ? errors.map(error => <div className='error' key={error}>{error}</div>) :null }
                    <Elements stripe={stripePromise}>    
                        <CheckoutForm/>
                    </Elements>
                    <button onClick={deleteOrder}>Delete Entire Cart</button>
                    </div> : <h1>Current Cart is Empty</h1>
    )
}

export default Cart;