import React, { useContext, useState, useEffect } from 'react';
import '../App.css'
import { UserContext } from './context/User';

function OrderProductCard({ products, product_order }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [product, setProduct] = useState([])

    useEffect(() => {
        const settingProduct = product_order ? setProduct(products.filter(prod => prod.id === product_order.product_id)[0]) : null
    }, [product_order])

    return (
        <div>
            {"("}{product_order.quantity}{")"} Custom Handstamped
            <br/>
            {product.jewelry} - ${product.price}
            <br/>
            Personalization: {product_order.personalization}
            <br/>
            <br/>
        </div>
    )
}

export default OrderProductCard;