import React, { useContext, useState, useEffect }  from 'react';
import { UserContext } from './context/User';
import ProductsList from './ProductsList';

function PrevPersonalizations({ order, setOrder, orders, setOrders, productCount, setProductCount, productOrders, products, orderId, setOrderId }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [customerProductOrders, setCustomerProductOrders] = useState([])
    const [personalizationForm, setPersonalizationForm] = useState('')

    function handleChange(e) {
      setPersonalizationForm(e.target.value);
    }

    useEffect(() => {
        setCustomerProductOrders(currentCustomer.product_orders)
    }, [orders])

    const productOrderMap = customerProductOrders ? customerProductOrders.filter(product => product.personalization.toLowerCase().indexOf(personalizationForm.toLowerCase()) > -1).map(prodOrder => <ProductsList key={prodOrder.id} orderId={orderId} setOrderId={setOrderId} productCount={productCount} setProductCount={setProductCount} order={order} setOrder={setOrder} setOrders={setOrders} prodOrder={prodOrder} customerProductOrders={customerProductOrders} orders={orders} products={products}/>) : null

  return (
    currentCustomer.product_orders && productOrderMap && productOrderMap.length !== 0 ? <div>
        Search for a Personalization:
          <br/>
            <input type="text" name="personalizationValue" value={personalizationForm} onChange={handleChange} />
          <br/>
          <br/>
        {productOrderMap}
    </div> : <div>
    Search for a Personalization:
          <br/>
            <input type="text" name="personalizationValue" value={personalizationForm} onChange={handleChange} />
          <br/>
          <br/>
    No previous personalizations.</div>
  );
}

export default PrevPersonalizations;