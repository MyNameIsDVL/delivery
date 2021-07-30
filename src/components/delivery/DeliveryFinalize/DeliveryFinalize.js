import React, { useEffect, useState, useContext } from 'react';
import { PStore } from '../../../store/PStore';
import { rdb } from '../../../firebaseConfig';
import { useHistory } from 'react-router-dom';
import SearchForRest from '../DeliverySearchRestaurant/SearchForRest';
import './DeliveryFinalize.css';

function useRadioButtons(name) {
    const [value, setState] = useState(null);
  
    const handleChange = e => {
      setState(e.target.value);
    };
  
    const inputProps = {
      name,
      type: "radio",
      onChange: handleChange
    };
  
    return [value, inputProps];
}

const DeliveryFinalize = ({ currentUserId, currentLocation, currentPhone }) => {

    const { basket_added, restl } = useContext(PStore);

    const [platformValue, plaftormInputProps] = useRadioButtons("payment");
    const [payMethodValue, payMethodInputProps] = useRadioButtons("pay_method");

    const [payOnline, setPayOnline] = useState('none');
    const [payCartHome, setPayCartHome] = useState('none');
    const [payPersonal, setPayPersonal] = useState('none');

    const[phone, setPhone] = useState(currentPhone);
    const[location, setLocation] = useState(currentLocation);

    // topaypal
    const[goToPaypal, setGoToPaypal] = useState(false);
    const[goToPayU, setGoToPayU] = useState(false);
    const[goGPay, setGoGPay] = useState(false);

    const history = useHistory();

    // TODO zabezpieczyć jeżeli w koszyku nie ma nic

    useEffect(() => {

        if (platformValue === 'online') {
            setPayOnline('block');
            setPayCartHome('none');
            setPayPersonal('none');
        }

        if (platformValue === 'cart') {
            setPayCartHome('block');
            setPayOnline('none');
            setPayPersonal('none');
        }

        if (platformValue === 'personal') {
            setPayPersonal('block');
            setPayOnline('none');
            setPayCartHome('none');
        }

    }, [platformValue])

    useEffect(() => {
        if (payMethodValue === 'paypal') {
            setGoToPaypal(true);
            setGoToPayU(false);
            setGoGPay(false);
        }

        if (payMethodValue === 'payu') {
            setGoToPayU(true);
            setGoToPaypal(false);
            setGoGPay(false);
        }

        if (payMethodValue === 'googlepay') {
            setGoGPay(true);
            setGoToPaypal(false);
            setGoToPayU(false);
        }
    }, [payMethodValue])

    useEffect(() => {
        setPhone(currentPhone);
        setLocation(currentLocation);
    }, [currentLocation, currentPhone])

    const paypalPayment = () => {

        if (goToPaypal === true) {
            history.push('/delivery/paypal');
        }

        if (goToPayU === true) {
            console.log('payu is true');
        }

        if (goGPay === true) {
            history.push('/delivery/googlepay');
        }

    }

    const payInRestaurant = () => {
        restl.filter(rest => rest.IdUser === currentUserId).forEach(prod => {
            const ref = rdb.ref('orders_pay_on_delivery');
            const childRef = ref.push({
                ClientId: currentUserId,
                Location: currentLocation,
                OrderDate: Date(),
                PaymentMethod: "przy odbiorze osobistym w restauracji",
                PaymentResult: "brak",
                Phone: currentPhone,
                Restaurant: prod.RestLocation
            }).catch(err => console.log(err));
            childRef.then(item => {
                ref.child(item.key).update({
                    KeyId: item.key
                });
            });
        });

        basket_added.filter(bas => bas.IdUser === currentUserId).forEach(prod => { 
            rdb.ref('basket_added').child(prod.IdKey).remove();
        });

        history.push(`/delivery/paymentsuccess/payInRestaurant`);
    }

    const payCardOnDelivery = () => {
        let prods = [];
        basket_added.filter(bas => bas.IdUser === currentUserId).forEach(prod => { 
            prods.push(prod);
            rdb.ref('basket_added').child(prod.IdKey).remove();
        }); 

        const ref = rdb.ref('orders_pay_on_delivery');
        const childRef = ref.push({
            ClientId: currentUserId,
            Location: currentLocation,
            OrderDate: Date(),
            PaymentMethod: "przy dostawie",
            PaymentResult: "brak",
            Phone: currentPhone,
            Products: [...prods]
        }).catch(err => console.log(err));
        childRef.then(item => {
            ref.child(item.key).update({
                KeyId: item.key
            });
        });

        history.push('/delivery/paymentsuccess/payCardOnDelivery');
    }

    return(
        <div className="deliveryFinalize">
            <div id="deliveryFinalize-box-main" className="deliveryFinalize-box">
                <div className="ui form">
                    <div className="grouped fields">
                        <h3>Prosimy wybrać metodę zapłaty</h3>
                        <div className="field">
                            <div className="ui toggle checkbox">
                                <input value="online" checked={platformValue === "online"} {...plaftormInputProps} />
                                <label>Płacę online (Z dostawą)</label>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui toggle checkbox">
                                <input value="cart" checked={platformValue === "cart"} {...plaftormInputProps} />
                                <label>Płacę kartą przy odbiorze (Z dostawą)</label>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui toggle checkbox">
                                <input value="personal" checked={platformValue === "personal"} {...plaftormInputProps} />
                                <label>Płacę przy odbiorze osobistym (w wyznaczonej restauracji)</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="deliveryFinalize-payment-methods" className="deliveryFinalize-box" style={{ display: payOnline }}>
                <h3>Metody płatności</h3>
                <div className="ui form">
                    <div className="grouped fields">
                        <div className="field">
                            <div className="ui toggle checkbox">
                                <input value="paypal" checked={payMethodValue === "paypal"} {...payMethodInputProps} />
                                <label>Paypal (aktywne)</label>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui toggle checkbox">
                                <input value="payu" checked={payMethodValue === "payu"} {...payMethodInputProps} />
                                <label>PayU (nieaktywne)</label>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui toggle checkbox">
                                <input value="googlepay" checked={payMethodValue === "googlepay"} {...payMethodInputProps} />
                                <label>Google pay (aktywne)</label>
                            </div>
                        </div>
                    </div>
                </div>
                <h3>Dostawa</h3>
                <div className="deliveryFinalize-box-fields">
                    <div className="box-fields">
                        <label>Telefon</label>
                        <input type="number" onChange={ (e) => setPhone(e.target.value) } value={ phone || '' } />
                    </div>
                    <div className="box-fields">
                        <label>Adres</label>
                        <input type="text" onChange={ (e) => setLocation(e.target.value) } value={ location || '' } />
                    </div>
                </div>
                <button onClick={ () => paypalPayment() }>Zamawiam i płacę</button>
            </div>
            <div id="deliveryFinalize-cart-home" className="deliveryFinalize-box" style={{ display: payCartHome }}>
                <h3>Dostawa</h3>
                <div className="deliveryFinalize-box-fields">
                    <div className="box-fields">
                        <label>Telefon</label>
                        <input type="number" onChange={ (e) => setPhone(e.target.value) } value={ phone || '' } />
                    </div>
                    <div className="box-fields">
                        <label>Adres</label>
                        <input type="text" onChange={ (e) => setLocation(e.target.value) } value={ location || '' } />
                    </div>
                </div>
                <button onClick={ () => payCardOnDelivery() }>Zamawiam</button>
            </div>
            <div id="deliveryFinalize-personal" className="deliveryFinalize-box" style={{ display: payPersonal }}>
                <h3>Restauracja</h3>
                <div className="deliveryFinalize-box-fields">
                    <div className="box-fields">
                        <label>Lokalizacja</label>
                        <SearchForRest currentUserId={ currentUserId } />
                    </div>
                </div>
                <button onClick={ () => payInRestaurant() }>Zamawiam</button>
            </div>
        </div>
    );
}

export default DeliveryFinalize;