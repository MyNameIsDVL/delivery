import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DeliveryHome.css';
import DeliveryModalHome from '../DeliveryModalHome/DeliveryModalHome';
import SearchForRest from '../DeliverySearchRestaurant/SearchForRest';

const DeliveryHome = ({ user, currentUserId }) => {

    const [openModal, setOpenModal] = useState(false);

    return(
        <div className="deliveryHome">
            <div className="deliveryHome-title">
                <h1>Zamów z dostawą</h1>
                <div className="deliveryHome-dvl-flex">
                    <h3>Otrzymasz zamówienie za około</h3>
                    <span>30 min</span>
                </div>
            </div>
            <div className="deliveryHome-content">
                <div className="deliveryHome-content-delivery">
                    { user && 
                    <div>
                        <div className="header">
                            <h2>Dostawa</h2>
                        </div>
                        <div className="location">
                            <div className="location-input-container">
                                <SearchForRest currentUserId={ currentUserId } />
                                <button style={{ display: 'none' }} onClick={ () => setOpenModal(true) }><i className="icon street view"></i></button>
                            </div>
                        </div>
                    </div>
                    }
                    { !user && 
                        <div className="header">
                            <h2>Zaloguj się, zamów i delektuj się smakiem!</h2>
                        </div>
                    }
                    <div className="location-info">
                        <h2>Dostawa z restauracji:</h2>
                        <p>PL DVL-DESIGNS KIELCE,</p>
                        <p>tel: 432 423 424,</p>
                        <p>GODZINY OTWARCIA W DNI ROBOCZE: 9:00 - 23:00. WEEKEND: 11:00 - 20:00.</p>
                    </div>
                    <div className="delivery-btn">
                        <Link to="/delivery/menu"><button><i className="icon tasks"></i>Zamówienie</button></Link>
                    </div>
                    <div className="bottom-info-payment">
                        <img alt="payment" src="/delivery/assets/images/paypal-logo.png" />
                        <img alt="payment" src="/delivery/assets/images/blik.png" />
                        <img alt="payment" src="/delivery/assets/images/payu.png" />
                    </div>
                </div>
                <div className="deliveryHome-content-banner">
                    <img alt="fastfood" src="/delivery/assets/images/club-sandwich.webp" />
                </div>
            </div>
            { openModal && <DeliveryModalHome setOpenModal={ setOpenModal } /> }
        </div>
    );
};

export default DeliveryHome;