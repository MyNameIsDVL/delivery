import React from 'react';
import PayPalButton from './PayPalButton';
import './DeliveryPaypal.css';

const DeliveryPaypal = ({ currentUserId, currentPhone, currentLocation, currentUserName, currentEmail }) => {

    return(
        <div className="deliveryPaypal">
            <PayPalButton currentUserId={ currentUserId } currentPhone={ currentPhone } currentLocation={ currentLocation } currentUserName={ currentUserName } currentEmail={ currentEmail } />
        </div>
    );
}

export default DeliveryPaypal;