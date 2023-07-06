import React, { useContext, useState } from 'react';
import '../App.css'
import { UserContext } from './context/User';
import Address from './Address';
import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import CreateAddress from './CreateAddress';

function Account({ addresses, setAddresses, custAddresses, setCustAddresses }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [addressForm, setAddressForm] = useState('')

    function handleChange(e) {
        setAddressForm(e.target.value);
    }

    const filteredAddresses = custAddresses.filter(address => address.street.toLowerCase().indexOf(addressForm.toLowerCase()) > -1)
 
    const addressMap = custAddresses ? filteredAddresses.map(address => <Address key={address.id} custAddresses={custAddresses} setCustAddresses={setCustAddresses} address={address} addresses={addresses} setAddresses={setAddresses}/>) : null

    return (
        <div>
            Name: {currentCustomer.name}
            <br/>
            Email: {currentCustomer.email}
            <br/>
            <br/>
            <br/>
            <Link className='link' to={`/new-address`}>Add An Address</Link>
            <Routes>
                <Route path="/new-address/" element={<CreateAddress custAddresses={custAddresses} setCustAddresses={setCustAddresses} addresses={addresses} setAddresses={setAddresses}/>}/>
            </Routes>
            <br/>
            <br/>
            Search for an Address by Street:
                        <br/>
                        <input type="text" name="addressValue" value={addressForm} onChange={handleChange} />
                        <br/>
            <br/>
            <br/>
            {addressMap}
        </div>
    )
}

export default Account;