import React, { useState } from 'react';
import '../App.css'

function ProductCartCard({ product_order, products, order, setOrder, custProducts, setCustProducts, customizations, orderTotalAddition, setOrderTotalAddition, productCount, setProductCount, orders, setOrders }) {
    const [keepChanges, setKeepChanges] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(products.filter(product => product_order.product_id === product.id)[0])
    const [errors, setErrors] = useState([])

    const [productUpdate, setProductUpdate] = useState({
        quantity: product_order.quantity
    });
    const {quantity} = productUpdate

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
              .then(setKeepChanges(false))
            } else {
              res.json().then(json => setErrors([json.errors]))
            }
    })}

    function deletingProductOrder(deletedProduct) {
        const deletingProduct = custProducts.filter((prod) => {
            if (prod.id !== deleteProduct.id) {
                return deletedProduct
            }
        })
        setCustProducts(deletingProduct)
    }

    function deleteProduct() {
        fetch(`products/${currentProduct.id}`, {
            method:"DELETE"
        })
        .then(res =>{
          if(res.ok){
            setOrderTotalAddition(orderTotalAddition)
            setCurrentProduct({
                ...currentProduct,
                quantity: 0
            })
            setProductCount(productCount - 1)
            deletingProductOrder(product_order)
          }
          if (productCount === 0) {
            setOrder({...order,
                products: []})
          }
        })
    }

    function downClick() {
        if (quantity > 1) {
            setProductUpdate({
                quantity: quantity - 1
            })
            setOrderTotalAddition(orderTotalAddition- currentProduct.price)
            setKeepChanges(true)
        }
    }

    function upClick() {
            setProductUpdate({
                quantity: quantity + 1
            })
            setOrderTotalAddition(currentProduct.price * quantity)
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
                <p>Item Total: ${currentProduct.price * product_order.quantity + orderTotalAddition}</p>
                { keepChanges ? <button onClick={quantityUpdate}>Keep Changes?</button> : null}
                <br/>
                <button onClick={deleteProduct}>Remove Item</button>
                <br/>
                <br/>
            </div> : null
        }</>
    )
}

export default ProductCartCard;