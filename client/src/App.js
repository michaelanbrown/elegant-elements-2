import './App.css';
import { Routes, Route } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import { UserContext } from './components/context/User';
import Header from './components/Header';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';
import Account from './components/Account';
import Products from './components/Products';
import PreviousOrders from './components/PreviousOrders';
import Cart from './components/Cart';
import Success from './components/Success';
import Cancel from './components/Cancel';
import CreateAddress from './components/CreateAddress';
import { loadStripe } from '@stripe/stripe-js';
import AllOrders from './components/AllOrders';

function App() {
  const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
  const [customers, setCustomers] = useState([])
  const [addresses, setAddresses] = useState([])
  const [errors, setErrors] = useState([])
  const [productOrders, setProductOrders] = useState([])
  const [orders, setOrders] = useState([])
  const [productCount, setProductCount] = useState(currentCustomer.in_progress_product_count)
  const [order, setOrder] = useState([])
  const [orderProducts, setOrderProducts] = useState([])
  const [products, setProducts] = useState([])
  const [custProducts, setCustProducts] = useState([])
  const [progressOrder, setProgressOrder] = useState(false)
  const [custAddresses, setCustAddresses] = useState([])
  const [orderId, setOrderId] = useState(null)
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY)

  useEffect(() => {
    getProducts();
    fetch("/authorized_user")
    .then((res) => {
      if (res.ok) {
        res.json()
        .then((customer) => {
          setCurrentCustomer(customer);
          setCustProducts(customer.products)
          getCustomers();
          getAddresses();
          getProductOrders();
          setCustAddresses(customer.addresses)
          setProductCount(customer.in_progress_product_count)
          const cartOrder = customer.orders ? customer.orders.map(order => {
            if (order.status === "in progress") {
                setProgressOrder(order)
                setOrderId(order.id)
                return order
            } else {
                return null
            }
          }) : null
          fetch("/orders")
          .then((res) => {
            if(res.ok){
              res.json().then(orders => {
                setOrders(orders)
                setOrder(orders.filter(order => {
                  if (order.status === "in progress" && order.customer_id === customer.id) {
                    setOrderProducts(order.products)
                      return order
                  } else {
                      return null
                  }
              }))})
            } else {
              res.json().then(json => setErrors([json.error]))
            }
          })
        });
      }
    })
  },[])


function getOrders() {
  fetch("/orders")
  .then((res) => {
    if(res.ok){
      res.json().then(setOrders)
    } else {
      res.json().then(json => setErrors([json.error]))
    }
  })
}

  function getCustomers() {
    fetch("/customers")
    .then((res) => {
      if(res.ok){
        res.json().then(setCustomers)
      } else {
        res.json().then(json => setErrors([json.error]))
      }
    })
  }

  function getProducts() {
    fetch("/products")
    .then((res) => {
      if(res.ok){
        res.json().then(setProducts)
      } else {
        res.json().then(json => setErrors([json.error]))
      }
    })
  }

  function getProductOrders() {
    fetch("/product_orders")
    .then((res) => {
      if(res.ok){
        res.json().then(setProductOrders)
      } else {
        res.json().then(json => setErrors([json.error]))
      }
    })
  }

  function getAddresses() {
    fetch("/addresses")
    .then((res) => {
      if(res.ok){
        res.json().then(setAddresses)
      } else {
        res.json().then(json => setErrors([json.error]))
      }
    })
  }

  const [formData, setFormData] = useState({
    status: "submitted" 
})

  function orderUpdate(orderId) {
    fetch(`orders/${orderId}`, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify(formData)
    }).then((res) => {
        if(res.ok){
          res.json()
          .then(order => {
            setOrder([])
            updateOrders(order)
            setProductCount(0)
            })
        } else {
          res.json().then(json => setErrors([json.errors]))
        }
})}

function updateOrders(updatedOrder) {
  const updatingOrders = orders.map((currentOrder) => {
      if (currentOrder.id === orderId) {
          return updatedOrder
      } else {
          return currentOrder
      }
  })
  setOrders(updatingOrders)
}

  return (
    <main>
      <Header productCount={productCount} custAddresses={custAddresses}/>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/signup" element={<Signup customers={customers} setCustomers={setCustomers} getProducts={getProducts} getCustomers={getCustomers} getAddresses={getAddresses} getProductOrders={getProductOrders} getOrders={getOrders}/>} />
        <Route path="/login" element={<Login setOrderProducts={setOrderProducts} setProductOrders={setProductOrders} setCustProducts={setCustProducts} setProductCount={setProductCount} getProducts={getProducts} getCustomers={getCustomers} getAddresses={getAddresses} getProductOrders={getProductOrders} getOrders={getOrders} setOrder={setOrder}/>} />
        <Route path="/products" element={<Products products={products}/>} />
        <Route path="/account/*" element={<Account addresses={addresses} setAddresses={setAddresses} custAddresses={custAddresses} setCustAddresses={setCustAddresses}/>} />
        <Route path="/previous-orders" element={<PreviousOrders orders={orders} setOrders={setOrders} products={products}/>} />
        {currentCustomer.admin ? <Route path="/all-orders" element={<AllOrders orders={orders} setOrders={setOrders} products={products}/>} /> : null}
        <Route path="/new-address" element={<CreateAddress custAddresses={custAddresses} setCustAddresses={setCustAddresses} addresses={addresses} setAddresses={setAddresses}/>} />
        <Route path="/cart" element={<Cart stripePromise={stripePromise} formData={formData} setFormData={setFormData} custAddresses={custAddresses} setCustAddresses={setCustAddresses} order={order} setOrder={setOrder} productCount={productCount} setProductCount={setProductCount} orders={orders} setOrders={setOrders} productOrders={productOrders} setProductOrders={setProductOrders} custProducts={custProducts} setCustProducts={setCustProducts}/>} />
        <Route path="/success" element={<Success orderId={orderId} orderUpdate={orderUpdate}/>} />
        <Route path="/cancel" element={<Cancel/>} />
      </Routes>
    </main>
  );
}

export default App;