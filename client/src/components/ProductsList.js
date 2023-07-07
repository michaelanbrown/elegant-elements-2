import React, { useEffect, useState, useContext } from 'react';
import '../App.css'
import { UserContext } from './context/User';
import { useNavigate } from 'react-router-dom';

function ProductsList({ prodOrder, customerProductOrders, productCount, setProductCount, order, setOrder, orders, setOrders, products }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const navigate = useNavigate();
    const [custCustomization, setCustCustomization] = useState(false)
    const [productOrder, setProductOrder] = useState(null)
    const [product, setProduct] = useState([])
    const [orderId, setOrderId] = useState(false)
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        total: 0
    })
    const [customForm, setCustomForm] = useState({
        personalization: prodOrder.personalization,
        quantity: 1,
        product_id: product.id
    })
    const {total} = formData

    useEffect(() => {
        const identification = prodOrder ? setProductOrder(prodOrder) : null
        const customFormSet = prodOrder ? setCustomForm({...customForm, personalization: prodOrder.personalization, product_id: products.filter(prod => prod.id === prodOrder.product_id)[0].id}) : null
        const settingProduct = prodOrder ? setProduct(products.filter(prod => prod.id === prodOrder.product_id)[0]) : null
        const orderSetting = order && order[0] ? setOrder(order[0]) : null
    }, [customerProductOrders])
    
    function orderAgain() {
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
                                res.json().then(productOrder => {
                                    setProductCount(productCount + 1)
                                    setCurrentCustomer({...currentCustomer, product_orders: [...currentCustomer.product_orders, productOrder]})
                                    setOrder({...order,
                                        id: newOrder.id,
                                        products: [...order.products, product],
                                        product_orders: [...order.product_orders, productOrder],
                                        total: order.total + (productOrder.price * customForm.quantity)})
                                        navigate(`/cart`)
                                })
                            } else {
                                res.json().then(json => setErrors([...errors, json.errors]))
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
                                setCurrentCustomer({...currentCustomer, product_orders: [...currentCustomer.product_orders, productOrder]})
                                setOrder({...order,
                                    id: orderId,
                                    products: [...order.products, product],
                                    product_orders: [...order.product_orders, productOrder],
                                    total: order.total + (product.price * customForm.quantity)})
                                    navigate(`/cart`)
                            }) 
                        } else {
                            res.json().then(json => setErrors([...errors, json.errors]))
                        }
                    })
                }})
            }

    return (
        <div className='customization'>
        <img className="productimg" src={product.image} alt={product.jewelry} width="30%" height="30%"/>
        <br/>
        Jewelry: {product ? product.jewelry : null}
        <br/>
        <br/>
        Customization: {productOrder ? productOrder.personalization : null}
        <br/>
        <br/>
        Price: $ {product.price}
        <br/>
        <br/>
        <button onClick={orderAgain}>Order Again</button>
        <br/>
        { errors ? errors.map(error => <div className='error' key={error}>{error}</div>) :null }
        <br/>
    </div>
    )
}

export default ProductsList;