import React, { useContext } from 'react';
import { PStore } from '../../../store/PStore';
import './DeliveryOrders.css';

const DeliveryOrders = ({ currentUserId }) => {

    const { ordered } = useContext(PStore);

    return(
        <>
        { ordered.filter(ord => ord.ClientId === currentUserId).length === 0 &&
            <div className="ui primary message">Twoja historia zamówień jest pusta</div>
        }
        {  
        ordered.filter(ord => ord.ClientId === currentUserId).map(order => ( 
            <div className="deliveryOrders" key={ order.KeyId }>
                <p>{ order.OrderDate }</p>
            { order.Products.filter(or => or !== undefined).flat().map(item => (
                <div className="deliveryOrders-product" key={ item.IdKey }>
                    <h3>Nazwa produktu: { item.ProductName }</h3>
                    <p>Cena: { item.ProductPrice } zł</p>
                    <p>Ilość: { item.ProductQuantity }</p>
                    <p>Opis: { item.ProductDescription }</p>
                </div>   
            )) }
                <p><span>Metoda płatności:</span> { order.PaymentMethod }</p>
                <p><span>Status płatności:</span> { order.PaymentResult }</p>
                <p><span>Podany numer:</span> { order.Phone }</p>
            </div>
        ))
        }
        </>
    );
}

export default DeliveryOrders;