import React from 'react';
import './DeliveryPromo.css';

const DeliveryPromo = () => {
    return(
        <div className="deliveryPromo">
            <div className="deliveryPromo-promo-img">
                <img alt="banner" src="/delivery/assets/images/burger-bigdaddy.png" />
            </div>
            <div className="deliveryPromo-promo-img">
                <img alt="banner" src="/delivery/assets/images/burgerbannerdelgado.png" />
            </div>
            <div className="deliveryPromo-promo-img">
                <img alt="banner" src="/delivery/assets/images/burgerrrbanner.png" />
            </div>
        </div>
    );
}

export default DeliveryPromo;