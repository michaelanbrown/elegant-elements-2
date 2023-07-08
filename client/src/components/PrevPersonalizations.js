import React, { useContext, useState, useEffect }  from 'react';
import { UserContext } from './context/User';
import ProductsList from './ProductsList';

function PrevPersonalizations({ order, setOrder, orders, setOrders, productCount, setProductCount, productOrders, products, orderId, setOrderId }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [customerProductOrders, setCustomerProductOrders] = useState([])

    useEffect(() => {
        setCustomerProductOrders(currentCustomer.product_orders)
    }, [orders])

    const productOrderMap = customerProductOrders ? customerProductOrders.map(prodOrder => <ProductsList key={prodOrder.id} orderId={orderId} setOrderId={setOrderId} productCount={productCount} setProductCount={setProductCount} order={order} setOrder={setOrder} setOrders={setOrders} prodOrder={prodOrder} customerProductOrders={customerProductOrders} orders={orders} products={products}/>) : null

  return (
    <div>
        {productOrderMap}
    </div>
  );
}

export default PrevPersonalizations;