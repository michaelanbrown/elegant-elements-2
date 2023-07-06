import React, { useContext, useState } from 'react';
import '../App.css'
import { UserContext } from './context/User';

function Address({ address, addresses, setAddresses, custAddresses, setCustAddresses }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [active, setActive] = useState(false)
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        id: address.id,
        name: address.name,
        street: address.street,
        unit: address.unit,
        city: address.city,
        state: address.state,
        zip: address.zip,
    })
    const {name, street, unit, city, state, zip} = formData

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    }

    // function deleteAddress(address) {
    //     const deletingAddress = addresses.filter((addie) => {
    //         if (addie.id !== address.id) {
    //             return address
    //         }
    //     })
    //     setAddresses(deletingAddress)
    //     const deletingCustAddress = custAddresses.filter((addie) => {
    //         if (addie.id !== address.id) {
    //             return address
    //         }
    //     })
    //     setCustAddresses(deletingCustAddress)
    // }

    // function deleteCustomerAddress(){
    //     fetch(`/addresses/${address.id}`, {
    //         method: 'DELETE'
    //     })
    //     .then(res => {
    //         if(res.ok)
    //         deleteAddress(address)
    //     })
    // }

    function onUpdateClick() {
        setActive(!active)
    }

    function updateAddresses(updatedAddress) {
        const updatingCustAddress = custAddresses.map((currentAddress) => {
            if (currentAddress.id === address.id) {
                return updatedAddress
            } else {
                return currentAddress
            }
        })
        setCustAddresses(updatingCustAddress)
        setActive(!active)
        const updatingAddress = addresses.filter((addie) => {
            if (addie.id !== address.id) {
                return address
            }
        })
        setAddresses(updatingAddress)
    }

    function addressUpdate(e) {
        e.preventDefault()
        fetch(`addresses/${address.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(formData)
        }).then((res) => {
            if(res.ok){
              res.json(updateAddresses(formData))
              .then()
            } else {
              res.json().then(json => setErrors(json.errors))
            }
    })}

    return(
        active == false ? <>
            <div className='address'>
                <br/>
                {name}
                <br/>
                {street}{unit ? ", Unit: " : null}{unit ? unit : null}
                <br/>
                {city}, {state} {zip}
                <br/>
                <br/>
                <button onClick={onUpdateClick}>Update</button>
                <br/>
                <br/>
                { errors ? errors.map(error => <div className='error' key={error}>{error}</div>) : null }
            </div>
        </> :
        <>
            <form onSubmit={addressUpdate}>
                Name: <input type="text" name="name" value={name} onChange={handleChange} />
                <br/>
                Street: <input type="text" name="street" value={street} onChange={handleChange} />
                <br/>
                Unit: <input type="text" name="unit" value={unit} onChange={handleChange} />
                <br/>
                City: <input type="text" name="city" value={city} onChange={handleChange} />
                <br/>
                State (Two Letters): <input type="text" name="state" value={state} onChange={handleChange} />
                <br/>
                Zip (5 Digits): <input type="text" name="zip" value={zip} onChange={handleChange} />
                <br/>
                <input type="submit" value="Submit" />
            </form>
            { errors ? errors.map(error => <div className='error' key={error}>{error}</div>) : null }
            <br/>
            <br/>
        </>
    )
}

export default Address;