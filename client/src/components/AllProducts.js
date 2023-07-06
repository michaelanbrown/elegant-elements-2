import React, { useState, useContext, useEffect } from 'react';
import '../App.css'
import { UserContext } from './context/User';
import { useNavigate } from 'react-router-dom';

function AllProducts({ product, productPrice, customizations, setCustomizations, orders, setOrders, order, setOrder, productCount, setProductCount }) {
    const options = ["phrase", "word", "date"]
    const navigate = useNavigate();
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const productName = product.name.slice(0,1).toUpperCase() + product.name.slice(1, product.name.length)
    const [viewOrderForm, setViewOrderForm] = useState(false)
    const [errors, setErrors] = useState([])
    const [defaultValue, setDefaultValue] = useState(null)
    const typeOptions = options.map(option => {
        return (<option value={option} key={option}>{option.slice(0,1).toUpperCase() + option.slice(1, option.length)}</option>)
    })
    const [customForm, setCustomForm] = useState({
        custom_type: "",
        personalization: "",
        price: 0
    })
    const {custom_type, personalization, price} = customForm
    const [orderProduct, setOrderProduct] = useState({
        jewelry: product.name,
        customization_id: "",
        quantity: 1
    })
    const {jewelry, quantity} = orderProduct
    const [orderData, setOrderData] = useState({
        total: 0
    })
    const {total} = orderData

    useEffect(() => {
        const orderSetting = order && order[0] ? setOrder(order[0]) : null
        const defaultValueSetting = custom_type === "date" ? setDefaultValue("Date format: 00.00.0000") : setDefaultValue(null)
    }, [order, custom_type])

    function onViewClick(){
        setViewOrderForm(!viewOrderForm)
    }

    function handleChange(e) {
        setCustomForm({
            ...customForm,
            [e.target.name] : e.target.value
        });
    }

    function handleTypeChange(e) {

        if(document.getElementById('custom_type').value === "phrase") {
            setCustomForm({
                ...customForm,
                [e.target.id] : document.getElementById('custom_type').value,
                price : 4.00
            });
        } else {
            if(document.getElementById('custom_type').value === "word") {
                setCustomForm({
                    ...customForm,
                    [e.target.id] : document.getElementById('custom_type').value,
                    price : 2.00
                });
        } else {
            if (document.getElementById('custom_type').value === "date") {
                setCustomForm({
                    ...customForm,
                    [e.target.id] : document.getElementById('custom_type').value,
                    price : 2.00
                });
            }
        }
        }
    }

    function onOrder(e){
        e.preventDefault()
        const newOrder = {
            total
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
                        const customizationWithPrice = {
                            custom_type,
                            personalization,
                            price: customForm.price  
                        }
                      fetch("/customizations",{
                        method:'POST',
                        headers:{'Content-Type': 'application/json'},
                        body:JSON.stringify(customizationWithPrice)
                      })
                      .then(res => {
                          if(res.ok){
                              res.json().then(customization => {
                                setCustomizations([...customizations, customization])
                                const product = {
                                    jewelry,
                                    customization_id: customization.id,
                                    quantity,
                                    price: productPrice * quantity
                                }
                                  fetch("/products",{
                                    method:'POST',
                                    headers:{'Content-Type': 'application/json'},
                                    body:JSON.stringify(product)
                                  })
                                  .then(res => {
                                      if(res.ok){
                                          res.json().then(product => {navigate(`/cart`)
                                          setProductCount(productCount + 1)
                                          if (order.products) {
                                            setOrder({...order,
                                                id: newOrder.id,
                                                products: [...order.products, product],
                                                total: order.total + ((product.price + customization.price) * quantity)})
                                          }
                                          else {
                                            setOrder({
                                                id: newOrder.id,
                                                shipping: 7,
                                                products: [product],
                                                total: 7 + ((product.price + customization.price) * quantity)})
                                          }
                                        })
                                      } else {
                                          res.json().then(json => setErrors([...errors, json.errors]))
                                      }
                                  })
                              })
                            } else {
                                res.json().then(json => setErrors([...errors, json.errors.filter(error => error !== 'Custom type is not included in the list')]))
                            }
                      })
                  })
                } else {
                    const customization = {
                        custom_type,
                        personalization
                        }
                        const customizationWithPrice = {
                            custom_type,
                            personalization,
                            price: customForm.price  
                        }
                      fetch("/customizations",{
                        method:'POST',
                        headers:{'Content-Type': 'application/json'},
                        body:JSON.stringify(customization)
                      })
                      .then(res => {
                          if(res.ok){
                              res.json().then(customization => {
                                setCustomizations([...customizations, customization])
                                const product = {
                                    jewelry,
                                    customization_id: customization.id,
                                    quantity,
                                    price: productPrice * quantity
                                }
                                  fetch("/products",{
                                    method:'POST',
                                    headers:{'Content-Type': 'application/json'},
                                    body:JSON.stringify(product)
                                  })
                                  .then(res => {
                                      if(res.ok){
                                          res.json().then(product => {navigate(`/cart`)
                                          setProductCount(productCount + 1)
                                          if (order.products) {
                                            setOrder({...order,
                                                id: order.id,
                                                products: [...order.products, product],
                                                total: order.total + ((product.price + customization.price) * quantity)})
                                          }
                                          else {
                                            setOrder({...order,
                                                id: order.id,
                                                shipping: 7,
                                                products: [product],
                                                total: 7 + ((product.price + customization.price) * quantity)})
                                          }
                                        })
                                      } else {
                                          res.json().then(json => setErrors([...errors, json.errors]))
                                      }
                                  })
                              })
                            } else {
                                res.json().then(json => setErrors([...errors, json.errors.filter(error => error !== 'Custom type is not included in the list')]))
                            }
                      })
                }
          })
    }

    function downClick() {
        if (quantity > 1) {
            setOrderProduct({
                ...orderProduct,
                quantity: quantity - 1
            })
        }
    }

    function upClick() {
            setOrderProduct({
                ...orderProduct,
                quantity: quantity + 1
            })
    }

    return (
        <div>
            <div className="productcontainer">
                <img className="productimg" src={product.img} alt={product.name} width="30%" height="30%"/>
                <br/>
                <div className="productform">Custom Handstamped {productName}
                <br/>
                {viewOrderForm == false && currentCustomer ? <button onClick={onViewClick}>Add to Order</button> : null}
                {viewOrderForm ? <div>
                    <br/>
                    <form onSubmit={onOrder}>
                        Custom Type:
                        <br/>
                        <select id="custom_type" onChange={handleTypeChange}>
                            <option value={""} key={""}>{""}</option>
                            {typeOptions}
                        </select>
                        <br/>
                        Personalization:
                        <br/>
                        <input type="text" name="personalization" placeholder={defaultValue} value={personalization} onChange={handleChange} />
                        <br/>
                        Quantity:
                        <br/>
                        <input type="button" value="-" onClick={downClick} />
                        {" "}{quantity}{" "}
                        <input type="button" value="+" onClick={upClick} />
                        <br/>
                        <br/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div> : null}
                { errors ? errors.map(error => <div className='error' key={error}>{error}</div>) :null }
                </div>
            </div>
        </div>
    )
}

export default AllProducts;