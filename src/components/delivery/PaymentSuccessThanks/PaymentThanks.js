import React from 'react';
import { Link } from 'react-router-dom';
import './PaymentThanks.css';

const PaymentThanks = () => {

    const pathId = window.location.pathname.substr(25);

    const displayMessage = () => {
        switch (pathId) {
            case 'payOnline':
                return (
                    <>
                        <h1>Dziękujemy</h1>
                        <p>Twoja płatność powiodła się.</p>
                        <Link to="/delivery">Strona główna</Link>
                    </>
                );
            case 'payCardOnDelivery':
                return(
                    <>
                        <h1>Dziękujemy</h1>
                        <p>Twoje zamówienie jest w trakcie realizacji.</p>
                        <p>Szacowanych czas oczekiwania to 30 minut.</p>
                        <Link to="/delivery">Strona główna</Link>
                    </>
                );
            case 'payInRestaurant':    
                return(
                    <>
                        <h1>Dziękujemy</h1>
                        <p>Twoje zamówienie jest w trakcie realizacji.</p>
                        <p>Szacowanych czas oczekiwania to 10 minut.</p>
                        <p>Twoje zamówienie będzie na Ciebie czekać przez 40 minut w wybranej wcześniej restauracji.</p>
                        <Link to="/delivery">Strona główna</Link>
                    </>
                );
            default:
                break;
        }
    }

    return(
        <div className="paymentThanks">
            { displayMessage() }
        </div>
    );
}

export default PaymentThanks;