import React, { useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css'
import { UserContext } from './context/User';

function Signup({ customers, setCustomers, getProducts, getCustomers, getAddresses, getCustomizations, getOrders }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        name:'',
        username: '',
        email:'',
        password:''
    })

    const {name, username, email, password} = formData
    const navigate = useNavigate();

    function onSubmit(e){
        e.preventDefault()
        const customer = {
            name,
            username,
            email,
            password
        }   
        fetch(`/customers`,{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(customer)
        })
        .then(res => {
            if(res.ok){
                res.json().then(customer => {
                    setCurrentCustomer(customer)
                    setCustomers([...customers, customer])
                    getCustomers();
                    getAddresses();
                    getProducts();
                    getCustomizations();
                    getOrders();
                    navigate(`/new-address/`)
                })
            } else {
                res.json().then(json => setErrors(json.errors))
            }
        })  
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    }

    return (
        <> 
        <form onSubmit={onSubmit}>
            Name: <input type='text' name='name' value={name} onChange={handleChange} />
            <br/>
            Username: <input type='text' name='username' value={username} onChange={handleChange} />
            <br/>
            Email: <input type='text' name='email' value={email} onChange={handleChange} />
            <br/>
            Password: <input type='password' name='password' value={password} onChange={handleChange} />
            <br/>
            <input type='submit' value='Sign up!' />
        </form>
        { errors ? <br/> : null }
        { errors ? errors.map(error => <div className='error' key={error}>{error}</div>) :null }
        </>
    )
}

export default Signup;