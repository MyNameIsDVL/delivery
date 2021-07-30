import React from 'react';
import './DeliveryModalHome.css';
import Map from './Map';

const DeliveryModalHome = ({ setOpenModal, google }) => {
    return(
        <div className="deliveryModalHome">
            <div className="deliveryModalHome-content">
                <button onClick={ () => setOpenModal(false) }><i className="icon delete"></i></button>
                <div className="deliveryModalHome-content-title">
                    <h2>Wyszukaj i zapisz lokalizację restauracji najbliżej Ciebie</h2>
                </div>
                <div className="deliveryModalHome-content-body">
                    <Map
                        center={{ lat: 52.237049, lng: 21.017532 }}
                        height='500px'
                        zoom={ 15 }
                    />
                </div>
                <div className="deliveryModalHome-content-footer"></div>
            </div>
        </div>
    );
}

export default DeliveryModalHome;