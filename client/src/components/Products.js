import React from 'react';
import '../App.css'
import AllProducts from './AllProducts';

function Products({ orders, setOrders, order, setOrder, productCount, setProductCount, customizations, setCustomizations }) {
    const products = [{
            name: "necklace",
            price: 10.00,
            img: "https://cdn.shopify.com/s/files/1/0008/8932/3571/products/DSC_0019_800x800_1200x1200.jpg?v=1541563917"
        },
        {
            name: "bracelet",
            price: 9.00,
            img: "https://i.etsystatic.com/36356145/c/2250/3000/0/0/il/dae616/4014621765/il_680x540.4014621765_6hiw.jpg"
        },
        {
            name: "keychain",
            price: 8.00,
            img: "https://cdn.shopify.com/s/files/1/0286/6042/products/il_fullxfull.993577520_n2ym_1024x1024.jpg?v=1466991492"
        }]

        const productMap = products.map(product => <AllProducts key={product.name} customizations={customizations} setCustomizations={setCustomizations} productPrice={product.price} product={product} productCount={productCount} setProductCount={setProductCount} orders={orders} setOrders={setOrders} order={order} setOrder={setOrder}/>)

    return (
        <div>
            { productMap }
        </div>
    )
}

export default Products;