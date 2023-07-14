import React, { useContext, useState } from 'react';
import '../App.css'
import { UserContext } from './context/User';

function ProductCartCard({ product_order, products, order, setOrder, custProducts, setCustProducts, customizations, orderTotalAddition, setOrderTotalAddition, productCount, setProductCount, orders, setOrders }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [keepChanges, setKeepChanges] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(products.filter(product => product_order.product_id === product.id)[0])
    const [errors, setErrors] = useState([])
    const [productAddition, setProductAddition] = useState(0)

    const [productUpdate, setProductUpdate] = useState({
        quantity: product_order.quantity
    });
    const {quantity} = productUpdate

    function updateOrderProductOrders(orderToUpdate) {
        const updatingOrders = order.product_orders.map((currentProductOrder) => {
            if (currentProductOrder.id === product_order.id) {
                return orderToUpdate
            } else if (currentProductOrder.id !== product_order.id){
                return currentProductOrder
            }
        })
        setOrder({...order, product_orders: updatingOrders, total: order.total + orderTotalAddition})
      }

    function quantityUpdate() {
        fetch(`product_orders/${product_order.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(productUpdate)
        }).then((res) => {
            if(res.ok){
              res.json()
              .then(updatedOrder => {
                setKeepChanges(false)
                updateOrderProductOrders(updatedOrder)
                setOrderTotalAddition(0)
                setProductAddition(0)
            })
            } else {
              res.json().then(json => setErrors(json.errors))
            }
    })}

    function deletingProductOrder(product_order) {
        const deletingProductOrder = order.product_orders.filter(prod => prod.id !== product_order.id)
        setOrder({...order, product_orders: deletingProductOrder})
        const deletingProductOrderfromCustomer = currentCustomer.product_orders.filter(prod => prod.id !== product_order.id)
        setCurrentCustomer({...currentCustomer, product_orders: deletingProductOrderfromCustomer})
    }

    function deleteProduct() {
        fetch(`product_orders/${product_order.id}`, {
            method:"DELETE"
        })
        .then(res =>{
          if(res.ok){
            setOrderTotalAddition(orderTotalAddition - (currentProduct.price * product_order.quantity))
            setProductAddition(productAddition - (currentProduct.price * product_order.quantity))
            setCurrentProduct([])
            setProductCount(productCount - 1)
            deletingProductOrder(product_order)
          }
          if (productCount === 0) {
            setOrder({...order,
                products: [],
                product_orders: []})
          }
        })
    }

    function downClick() {
        if (quantity > 1) {
            setProductUpdate({
                quantity: quantity - 1
            })
            setOrderTotalAddition(orderTotalAddition - currentProduct.price)
            setProductAddition(productAddition - currentProduct.price)
            setKeepChanges(true)
        }
    }

    function upClick() {
            setProductUpdate({
                quantity: quantity + 1
            })
            setOrderTotalAddition(currentProduct.price * quantity)
            setProductAddition(currentProduct.price * quantity)
            setKeepChanges(true)
    }

    return (
        <>
        {currentProduct ?
            <div className="productCard">
                <img className="productimg" src={ currentProduct.image } alt={currentProduct.name} width="44%" height="44%"/>
                <br/>
                <p>{currentProduct.jewelry}: ${currentProduct.price}</p>
                <div>Custom Stamp: {product_order.personalization}</div>
                <p>Quantity: <input type="button" value="-" onClick={downClick} />
                    {" "}{quantity}{" "}
                <input type="button" value="+" onClick={upClick}/></p>
                <p>Item Total: ${(currentProduct.price * product_order.quantity) + productAddition}</p>
                { keepChanges ? <button onClick={quantityUpdate}>Keep Changes?</button> : null}
                <br/>
                <button onClick={deleteProduct}>Remove Item</button>
                <br/>
                { errors ? errors.map(error => <div className='error' key={error}>{error}</div>) : null }
                <br/>
            </div> : null
        }</>
    )
}

export default ProductCartCard;