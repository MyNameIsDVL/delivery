import React, { useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import './DeliveryHistory.css';
import $ from 'jquery';

import DeliveryOrders from '../DeliveryOrders/DeliveryOrders';
import DeliveryLogin from '../DeliveryLogin/DeliveryLogin';
import DeliveryStatus from '../DeliveryStatus/DeliveryStatus';
import DeliveryPromo from '../DeliveryPromo/DeliveryPromo';

const DeliveryHistory = ({ user, currentUserId }) => {

    useEffect(() => {
        $('.deliveryHistory-sidebar li').click(function() {
            $('.deliveryHistory-sidebar li').removeClass('deliveryHistory_item_selected');
            $(this).toggleClass('deliveryHistory_item_selected');
        });
    }, [])

    return(
        <div className="deliveryHistory">
            <div className="deliveryHistory-sidebar">
                <ul>
                    <li className="deliveryHistory_item_selected">
                        <Link to="/delivery/history">Historia zamówień</Link>
                    </li>
                    <li style={{ display: 'none' }}>
                        <Link to="/delivery/history/status">Status zamówień</Link>
                    </li>
                    <li>
                        <Link to="/delivery/history/promo">Karty promocyjne</Link>
                    </li>
                </ul>
            </div>
            <div className="deliveryHistory-content-for-sidebar">
                <div className="deliveryHistory-content-for-sidebar-container">
                    <Route exact path="/delivery/history" component={ () => user ? <DeliveryOrders currentUserId={ currentUserId } /> : <DeliveryLogin /> } />
                    <Route exact path="/delivery/history/status" component={ () => user ? <DeliveryStatus /> : <DeliveryLogin /> } />
                    <Route exact path="/delivery/history/promo" component={ () => user ? <DeliveryPromo /> : <DeliveryLogin /> } />
                </div>
            </div>
        </div>
    );
}

export default DeliveryHistory;