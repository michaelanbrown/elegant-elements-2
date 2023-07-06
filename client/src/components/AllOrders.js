import React, { useContext, useState } from 'react';
import '../App.css'
import { UserContext } from './context/User';
import OrderCard from './OrderCard';

function AllOrders({ orders, setOrders, products }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [search, setSearch] = useState('')
    const statuses = ["canceled", "fulfilled", "submitted"]

    const canceledOrders = orders.filter(order => {
        if(order.status === "canceled") {
            return order
        } else {
            return null
        }
    })

    const fulfilledOrders = orders.filter(order => {
        if(order.status === "fulfilled") {
            return order
        } else {
            return null
        }
    })

    const submittedOrders = orders.filter(order => {
        if(order.status === "submitted") {
            return order
        } else {
            return null
        }
    })

    const canceledOrderMap = canceledOrders.map(order => <OrderCard search={search} products={products} orders={orders} setOrders={setOrders} order={order} key={order.id}/>)

    const fulfilledOrderMap = fulfilledOrders.map(order => <OrderCard search={search} products={products} orders={orders} order={order} setOrders={setOrders} key={order.id}/>)

    const submittedOrderMap = submittedOrders.map(order => <OrderCard search={search} products={products} orders={orders} order={order} setOrders={setOrders} key={order.id}/>)

    const statusOptions = statuses.map(option => {
        return (<option value={option} key={option}>{option.slice(0,1).toUpperCase() + option.slice(1, option.length)}</option>)
    })

    function handleTypeChange(e) {
        setSearch(e.target.value);
    }

    return (
        orders !== undefined && orders.length !== 0 ? <div>
            <select className="addressselect" onChange={handleTypeChange}>
                <option key="blank" value={""}>{"Filter by Status"}</option>
                {statusOptions}
            </select>
            {canceledOrderMap.length !== 0 && (search === '' || search === 'canceled') ? <div>
                <br/>
                <br/>
                Canceled Order(s):
                <br/>
                <br/>
                {canceledOrderMap}
            </div> : null}
            {search === 'canceled' && canceledOrderMap.length === 0 ? <p>You don't have any canceled orders.</p> : null}
            {fulfilledOrderMap.length !== 0 && (search === '' || search === 'fulfilled') ? <div>
                <br/>
                <br/>
                Fulfilled Order(s):
                <br/>
                <br/>
                {fulfilledOrderMap}
            </div> : null}
            {search === 'fulfilled' && fulfilledOrderMap.length === 0 ? <p>You don't have any fulfilled orders.</p> : null}
            {submittedOrderMap.length !== 0 && (search === '' || search == 'submitted') ? <div>
                <br/>
                <br/>
                Submitted Order(s):
                <br/>
                (Payments pending. If an error occurred we will reach out for updated information.)
                <br/>
                <br/>
                {submittedOrderMap}
            </div> : null}
            {search === 'submitted' && submittedOrderMap.length === 0 ? <p>You don't have any submitted orders.</p> : null}
        </div> : <div>No previous orders.</div>
    )
}

export default AllOrders;