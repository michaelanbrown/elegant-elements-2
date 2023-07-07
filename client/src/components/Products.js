import React from 'react';
import '../App.css'
import AllProducts from './AllProducts';

function Products({ products, productCount, setProductCount, order, setOrder, orders, setOrders }) {

const productMap = products.map(product => <AllProducts key={product.id} product={product} setProductCount={setProductCount} productCount={productCount} order={order} setOrder={setOrder} orders={orders} setOrders={setOrders}/>)

    return (
        <div>
            {productMap}
        </div>
    )
}

export default Products;