import React, { useEffect, useState, useContext } from 'react';
import '../App.css'
import { UserContext } from './context/User';
import { useNavigate } from 'react-router-dom';

function ProductsList({ order, setOrder, orderProducts, productPrice, product, customizations, orders, setOrders, productCount, setProductCount }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const navigate = useNavigate();
    const [custCustomization, setCustCustomization] = useState(false)
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        total: 0
    })
    const {total} = formData
    const [reOrderProduct, setReOrderProduct] = useState({
        jewelry: product.jewelry.toLowerCase(),
        customization_id: product.customization_id,
        quantity: 1
    })
    const {jewelry, customization_id, quantity} = reOrderProduct
    
    useEffect(() => {
        (customizations.map(cust => {
            if (cust.id == product.customization_id) {
                setCustCustomization(cust)
                return cust
            }
        }))
    }, [customizations, order])


    const customType = custCustomization.custom_type ? custCustomization.custom_type : null
    const customizationLine = custCustomization ? <p>Customization: {customType} - "{ custCustomization.personalization }" </p> : null

    function onClick() {
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
                      const product = {
                        jewelry,
                        customization_id,
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
                              res.json().then(product => {
                              setProductCount(productCount + 1)
                              if (order.products) {
                                setOrder({...order,
                                    id: newOrder.id,
                                    products: [...order.products, product],
                                    total: order.total + ((product.price + product.customization.price) * quantity)})
                              }
                              else {
                                setOrder({
                                    id: newOrder.id,
                                    shipping: 7,
                                    products: [product],
                                    total: 7 + ((product.price + product.customization.price) * quantity)})
                              }
                                })
                            navigate(`/cart`)
                          } else {
                              res.json().then(json => setErrors([...errors, json.errors]))
                          }
                      })  
                  })
                } else {
                    const product = {
                        jewelry,
                        customization_id,
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
                              res.json().then(product => {
                              setProductCount(productCount + 1)
                              if (order.products) {
                                setOrder({...order,
                                    id: order.id,
                                    products: [...order.products, product],
                                    total: order.total + ((product.price + product.customization.price) * quantity)})
                              }
                              else {
                                setOrder({...order,
                                    id: order.id,
                                    shipping: 7,
                                    products: [product],
                                    total: 7 + ((product.price + product.customization.price) * quantity)})
                              }
                                })
                            navigate(`/cart`)
                          } else {
                              res.json().then(json => setErrors([...errors, json.errors]))
                          }
                      }) 
                }
          })
    }
    

    return (
            <div className='customization'>
                <br className='break'/>
                Jewelry: {product.jewelry}
                { customizationLine }
                <button onClick={onClick}>Order Again</button>
                <br/>
                { errors ? errors.map(error => <div className='error' key={error}>{error}</div>) :null }
                <br/>
            </div>
    )
}

export default ProductsList;