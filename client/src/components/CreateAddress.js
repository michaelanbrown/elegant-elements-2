import React, { useState } from 'react';
import '../App.css'
import { useNavigate } from 'react-router-dom';

function CreateAddress({ addresses, setAddresses, custAddresses, setCustAddresses, fromCart, setFromCart }){
    const [errors, setErrors] = useState([])
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        street: "",
        unit: "",
        city: "",
        state: "",
        zip: "",
    })
    const {name, street, unit, city, state, zip} = formData

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    }

    function onSubmit(e){
        e.preventDefault()
        const address = {
            name,
            street,
            unit,
            city,
            state,
            zip
        }
       
        fetch("/addresses",{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(address)
        })
        .then(res => {
            if(res.ok){
                res.json().then(address => {
                    setAddresses([...addresses, address])
                    setCustAddresses([...custAddresses, address])
                    fromCart ? navigate(`/cart`) : navigate(`/account`)
                    setFromCart(false)
                })
            } else {
                res.json().then(json => setErrors(json.errors))
            }
        }) 
    }

    return(
        <div>
            New Address
            <br/>
            <br/>
            <form onSubmit={onSubmit}>
                Name: <input className='addressform' type="text" name="name" value={name} onChange={handleChange} />
                <br/>
                Street: <input className='addressform' type="text" name="street" value={street} onChange={handleChange} />
                <br/>
                Unit: <input className='addressform' type="text" name="unit" value={unit} onChange={handleChange} />
                <br/>
                City: <input className='addressform' type="text" name="city" value={city} onChange={handleChange} />
                <br/>
                State (Two Letters): <input className='addressform' type="text" name="state" value={state} onChange={handleChange} />
                <br/>
                Zip (5 Digits): <input className='addressform' type="text" name="zip" value={zip} onChange={handleChange} />
                <br/>
                <input type="submit" value="Submit" />
            </form>
            <br/>
            { errors ? errors.map(error => <div className='error' key={error}>{error}</div>) : null }
        </div>
    )
}

export default CreateAddress;