import React from 'react';
import '../App.css'
import AllProducts from './AllProducts';

function Products({ products, productCount, setProductCount, order, setOrder, orders, setOrders, orderId, setOrderId }) {

const productMap = products.map(product => <AllProducts key={product.id} product={product} orderId={orderId} setOrderId={setOrderId}  setProductCount={setProductCount} productCount={productCount} order={order} setOrder={setOrder} orders={orders} setOrders={setOrders}/>)

    return (
        <div>
            {productMap}
        </div>
    )
}

export default Products;