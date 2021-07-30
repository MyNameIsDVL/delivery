import React from 'react';
import { Link } from 'react-router-dom';
import './DeliveryNotFound.css';

const DeliveryNotFound = () => {
    return(
        <div className="deliveryNotFound">
            <div className="deliveryNotFound-not-found-box">
                <div className="deliveryNotFound-not-found-box-flex">
                    <span>4</span>
                    <img src="/delivery/assets/images/dizzy.png" alt="o" />
                    <span>4</span>
                </div>
                <p>Ta strona nie istnieje</p>
                <p><Link to="/delivery">Powrót na stronę główna</Link></p>
            </div>
        </div>
    );
}

export default DeliveryNotFound;