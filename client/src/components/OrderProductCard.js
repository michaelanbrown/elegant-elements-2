import React, { useContext } from 'react';
import '../App.css'
import { UserContext } from './context/User';

function OrderProductCard({ product }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);

    return (
        <div>
            {product.quantity} Custom Handstamped {product.quantity == 1 ? product.jewelry : null}{product.quantity !== 1 ? <>{product.jewelry}s</> : null} - ${product.price}
            <br/>
            {product.customization.custom_type} - {product.customization.personalization} - ${product.customization.price * product.quantity}
            <br/>
            <br/>
        </div>
    )
}

export default OrderProductCard;