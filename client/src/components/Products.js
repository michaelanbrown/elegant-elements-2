import React from 'react';
import '../App.css'
import AllProducts from './AllProducts';

function Products({ products }) {
console.log(products)

const productMap = products.map(product => <AllProducts key={product.id} product={product}/>)

    return (
        <div>
            {productMap}
        </div>
    )
}

export default Products;