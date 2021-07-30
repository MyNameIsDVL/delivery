import React from 'react';
import './DeliveryFooter.css';
import { Link } from 'react-router-dom';

const DeliveryFooter = ({ user }) => {
    return(
        <div className="deliveryFooter">
            <div className="deliveryFooter-top">
                <div className="deliveryFooter-top-info">
                    <div className="phone-contact">
                        <i className="icon phone"></i>
                        <h3>Zamów przez telefon</h3>
                        <p>546345345</p>
                    </div>
                    <div className="security">
                        <i className="icon key"></i> 
                        <h3>Bezpieczeństwo</h3>
                        <p>Bezpieczne płatności on-line</p>
                    </div>
                    <div className="client">
                        <i className="icon user circle"></i>
                        <h3>Konto</h3>
                        <p>Zaloguj lub załóż konto</p>
                    </div>
                </div>
                <div className="deliveryFooter-top-app">
                    <div className="deliveryFooter-top-app-img">
                        <img alt="aplication" src="/delivery/assets/images/bgphone2x.png" />
                    </div>
                    <div className="deliveryFooter-top-app-content">
                        <h3>Aplikacja moblina</h3>
                        <p>Zamawiaj szybko i wygodnie z naszą aplikacją mobilną</p>
                        <a href="/delivery/assets/android_apk/app-debug.apk" target="_blank" download><button><i className="icon android"></i>APK</button></a>
                    </div>
                </div>
            </div>
            <div className="deliveryFooter-bottom">
                <div className="deliveryFooter-bottom-menu">
                    <ul>
                        <li><Link to="/delivery/menu">Menu</Link></li>
                        { user && 
                        <>
                            <li><Link to="/delivery/fav">Ulubione</Link></li>
                            <li><Link to="/delivery/profile">Profil</Link></li>
                        </>    
                        }
                    </ul>
                </div>
                <div className="deliveryFooter-bottom-footer">
                    <p>&copy; Designed & created by Mateusz Hus | dvl-designs</p>
                </div>
            </div>
        </div>  
    );
};

export default DeliveryFooter;