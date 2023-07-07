import React, { useState, useContext, useEffect } from 'react';
import '../App.css'
import { UserContext } from './context/User';
import { useNavigate } from 'react-router-dom';

function AllProducts({ product }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const navigate = useNavigate();
    const [viewOrderForm, setViewOrderForm] = useState(false)
    const [errors, setErrors] = useState(false)
    const [customForm, setCustomForm] = useState({
        personalization: "",
        quantity: 0
    })
    const {personalization, quantity} = customForm
    
    function onViewClick(){
        setViewOrderForm(!viewOrderForm)
    }

    function handleChange(e) {
        setCustomForm({
            ...customForm,
            [e.target.name] : e.target.value
        });
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
                    <form>
                    <br/>
                        Personalization:
                        <br/>
                        <input type="text" name="personalization" placeholder={(product.jewelry === "Necklace with a Date" || product.jewelry === "Keychain with a Date" || product.jewelry === "Bracelet with a Date") ? "Date format: 00.00.0000" : null} value={personalization} onChange={handleChange} />
                        <br/>
                        <br/>
                        Quantity:
                        <br/>
                        <input type="button" value="-" />
                        {" "}{quantity}{" "}
                        <input type="button" value="+" />
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