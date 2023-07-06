import React from 'react';
import '../App.css'

function Welcome() {
    

    return (
        <div>
            <br />
            <div>
                <img src={"https://cdn.shopify.com/s/files/1/0008/8932/3571/products/DSC_0019_800x800_1200x1200.jpg?v=1541563917"} alt="Handstamped Necklace Photo" width="80%" height="80%"/>
                <br/>
                <p className='welcome'>Here at Elegant Elements we are blessed to be able to provide our customers with the ability to be part of the creation of their own piece.</p>
                <br/>
                <div className='welcomebig'>Background</div>
                <p className='welcome'>Our inspiration comes from promoting good mental health.
                We started out creating jewerly with inspirational messages so that in a time of need one can look down and remember positive affirmations.
                As time went on, we decided to expand to any personalized message that a customer desires.
                We will continue to promote good health and well being to all!</p>
            </div>
        </div>
    )
}

export default Welcome;