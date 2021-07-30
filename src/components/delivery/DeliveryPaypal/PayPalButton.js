import React, { useEffect, useRef, useState, useContext } from 'react';
import { PStore } from '../../../store/PStore';
import { rdb } from '../../../firebaseConfig';
import { useHistory } from 'react-router-dom';
import './DeliveryPaypal.css';

const PayPalButton = ({ currentUserId, currentPhone, currentLocation }) => {

    const history = useHistory();

    const { basket_added } = useContext(PStore);

    const [error, setError] = useState('');

    const paypal = useRef();

    useEffect(() => {
        let totalp = 0;
        basket_added.filter(bas => bas.IdUser === currentUserId).forEach(prod => {  
            totalp = totalp + Number(prod.ProductPrice);
        });

        if (totalp) {
            window.paypal.Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: currentUserId,
                                amount: {
                                    currency_code: "PLN",
                                    value: totalp.toFixed(2)
                                }
                            }
                        ]
                    })
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();

                    const ref = rdb.ref('orders_pay_on_delivery');
                    const childRef = ref.push({
                        ClientId: currentUserId,
                        Location: currentLocation,
                        OrderDate: Date(),
                        PaymentMethod: "paypal",
                        PaymentResult: "zapłacone",
                        Phone: currentPhone
                    }).catch(err => console.log(err));
                    childRef.then(item => {
                        ref.child(item.key).update({
                            KeyId: item.key
                        });
                    });

                    basket_added.filter(bas => bas.IdUser === currentUserId).forEach(prod => { 
                        rdb.ref('basket_added').child(prod.IdKey).remove();
                    });

                    history.push('/delivery/paymentsuccess/payOnline');
    
                },
                onError: (err) => {
                    setError('Błąd podczas dokonywania płatności. Prosimy spróbować pownownie póżniej lub skontaktować się z administracją serwisu. Błąd: ' + err);
                }
            }).render(paypal.current);
        }
        
    }, [])

    return(
        <div className="payPalButton">
            <div ref={ paypal }></div>
            { error !== '' &&
                <div className="ui primary message">{ error }</div>
            }
        </div>
    );
}

export default PayPalButton;