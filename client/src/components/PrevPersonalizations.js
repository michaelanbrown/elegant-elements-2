import React, { useContext, useState, useEffect }  from 'react';
import { UserContext } from './context/User';
import ProductOrderList from './ProductOrderList';

function PrevPersonalizations({ orders, productOrders, products }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [customerProductOrders, setCustomerProductOrders] = useState([])

    useEffect(() => {
        setCustomerProductOrders(currentCustomer.product_orders)
    }, [orders])
    console.log(currentCustomer)

    const productOrderMap = customerProductOrders ? customerProductOrders.map(prodOrder => <ProductOrderList key={prodOrder.id} prodOrder={prodOrder}/>) : null

  return (
    <div>
        {productOrderMap}
    </div>
  );
}

export default PrevPersonalizations;