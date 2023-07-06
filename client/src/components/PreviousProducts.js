import React, { useContext, useState, useEffect }  from 'react';
import '../App.css'
import { UserContext } from './context/User';
import ProductsList from './ProductsList';

function PreviousProducts({ orderProducts, custProducts, order, setOrder, customizations, orders, setOrders, productCount, setProductCount }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const products = ["Necklace", "Bracelet", " Keychain"]
    const [productSearch, setProductSearch] = useState('')
    const [customSearch, setCustomSearch] = useState('')
    const [filteredProducts, setFilteredProducts] = useState(custProducts)

    useEffect(() => {
        setFilteredProducts(custProducts)
    }, [custProducts])

    const productMap = filteredProducts ? filteredProducts.map(product => <ProductsList key={product.id} productSearch={productSearch} productPrice={product.price} orderProducts={orderProducts} product={product} order={order} setOrder={setOrder} customizations={customizations} orders={orders} setOrders={setOrders} productCount={productCount} setProductCount={setProductCount}/>) : null

    const productOptions = products.map(option => {
        return (<option value={option} key={option}>{option}</option>)
    })

    function handleTypeChange(e) {
        setProductSearch(e.target.value);
        if (e.target.value == '') {
            setFilteredProducts(custProducts)
        } else {
            setFilteredProducts(custProducts.filter(product => product.jewelry == e.target.value))
        }
    }

    return (
        <div>
            <select className="addressselect" onChange={handleTypeChange}>
            <option key="blank" value={""}>{"Filter by Product"}</option>
            {productOptions}
            </select>
            <br/>
            <br/>
            <div>
            {(currentCustomer.products === undefined || currentCustomer.products.length === 0 || filteredProducts.length == 0) ? <div>No Previous Products Available </div> : productMap}
            </div>
        </div>
    )
}

export default PreviousProducts;