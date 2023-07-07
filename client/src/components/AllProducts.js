import React, { useState, useContext, useEffect } from 'react';
import '../App.css'
import { UserContext } from './context/User';
import { useNavigate } from 'react-router-dom';

function AllProducts({ product, productCount, setProductCount, order, setOrder, orders, setOrders }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const navigate = useNavigate();
    const [viewOrderForm, setViewOrderForm] = useState(false)
    const [errors, setErrors] = useState(false)
    const [orderId, setOrderId] = useState(false)
    const [customForm, setCustomForm] = useState({
        personalization: "",
        quantity: 1,
        product_id: product.id
    })

    useEffect(() => {
        const identification = order && order[0] ? setOrderId(order[0].id) : null
        const orderSetting = order && order[0] ? setOrder(order[0]) : null
    }, [order])

    const {personalization, quantity, product_id} = customForm
    
    function onViewClick(){
        setViewOrderForm(!viewOrderForm)
    }

    function handleChange(e) {
        setCustomForm({
            ...customForm,
            [e.target.name] : e.target.value
        });
    }

    function downClick() {
        if (quantity > 1) {
            setCustomForm({
                ...customForm,
                quantity: quantity - 1
            })
        }
    }

    function upClick() {
            setCustomForm({
                ...customForm,
                quantity: quantity + 1
            })
    }

    function onOrder(e){
        e.preventDefault()
        const newOrder = {
            total: 7.00
        }
        fetch("/orders",{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(newOrder)
          })
          .then(res => {
              if(res.ok){
                  res.json().then(newOrder => {
                      setOrders([...orders, newOrder])
                      setOrder(newOrder)
                      console.log(customForm)
                        fetch("/product_orders", {
                            method: 'POST',
                            headers:{'Content-Type': 'application/json'},
                            body:JSON.stringify(customForm)
                        }).then(res => {
                            if (res.ok) {
                                res.json().then(product => {
                                    setProductCount(productCount + 1)
                                    setOrder({...order,
                                        id: newOrder.id,
                                        products: [...order.products, product],
                                        total: order.total + (product.price * customForm.quantity)})
                                        navigate(`/cart`)
                                })
                            } else {
                                res.json().then(json => console.log(json))
                            }
                        })})
                } else {
                    fetch("/product_orders", {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(customForm)
                    }).then(res => {
                        if (res.ok) {
                            res.json().then(productOrder => {
                                setProductCount(productCount + 1)
                                setOrder({...order,
                                    id: orderId,
                                    products: [...order.products, product],
                                    product_orders: [...order.product_orders, productOrder],
                                    total: order.total + (product.price * customForm.quantity)})
                                    navigate(`/cart`)
                            }) 
                        } else {
                            res.json().then(json => console.log(json))
                        }
                    })
                }})
            }

    return (
        <div>
            <div className="productcontainer">
                <img className="productimg" src={product.image} alt={product.jewelry} width="30%" height="30%"/>
                <br/>
                <div className="productform">Custom Handstamped {product.jewelry}
                <br/>
                {viewOrderForm === false && currentCustomer ? <button onClick={onViewClick}>Add to Order</button> : null}
                {viewOrderForm ? <div>
                    <form onSubmit={onOrder}>
                    <br/>
                        Personalization:
                        <br/>
                        <input type="text" name="personalization" placeholder={(product.jewelry === "Necklace with a Date" || product.jewelry === "Keychain with a Date" || product.jewelry === "Bracelet with a Date") ? "Date format: 00.00.0000" : null} value={personalization} onChange={handleChange} />
                        <br/>
                        <br/>
                        Quantity:
                        <br/>
                        <input type="button" value="-" onClick={downClick}/>
                        {" "}{quantity}{" "}
                        <input type="button" value="+" onClick={upClick}/>
                        <br/>
                        <br/>
                        <input type="submit" value="Submit"/>
                    </form>
                    <br/>
                </div> : null}
                { errors ? errors.map(error => <div className='error' key={error}>{error}</div>) :null }
                </div>
            </div>
        </div>
    )
}

export default AllProducts;