import React, { useContext, useState, useEffect } from 'react';
import { PStore } from '../../../store/PStore';
import { rdb } from '../../../firebaseConfig';
import { Link } from 'react-router-dom';
import './DeliveryBasket.css';

const DeliveryBasket = ({ currentUserId }) => {

    const [totalPrice, setTotalPrice] = useState(null);

    const [pQuan, setPQuan] = useState(null);

    const { basket_added } = useContext(PStore);

    const isBasket = basket_added.filter(bas => bas.IdUser === currentUserId).length;

    useEffect(() => {
        let total = 0;
        basket_added.filter(bas => bas.IdUser === currentUserId).forEach(prod => {  
            total = total + Number(prod.ProductPrice);
        });
        setTotalPrice((total).toFixed(2));
    }, [totalPrice, basket_added, currentUserId])

    useEffect(() => {
        if (pQuan === 0) {
            setPQuan(1);
        }
    }, [pQuan])

    const minus = (val, key, price_per_item) => {
        if (val > 1) {
            rdb.ref('basket_added').child(key).update({
                ProductQuantity: val - 1,
                ProductPrice: (price_per_item * (val - 1)).toFixed(2)
            })
        }
    };

    const plus = (val, key, price_per_item) => {
        rdb.ref('basket_added').child(key).update({
            ProductQuantity: val + 1,
            ProductPrice: (price_per_item * (val + 1)).toFixed(2)
        }) 
    };

    const removeItemFromBasket = (idKey) => {
        rdb.ref('basket_added').child(idKey).remove();
    }

    return(
        <div className="deliveryBasket">
            <div className="deliveryBasket-details">
                <table className="ui inverted table deliveryBasket-table">
                    <thead>
                        <tr>
                            <th>Nazwa</th>
                            <th>Opis</th>
                            <th>Ilość</th>
                            <th>Cena</th>
                            <th>Usuń</th>
                        </tr>
                    </thead>
                    <tbody>
                        { isBasket === 0 &&
                        <tr>
                            <td>Brak produktów w koszyku</td>
                        </tr>                                              
                        }
                        { basket_added.filter(bas => bas.IdUser === currentUserId).map(prod => (
                        <tr key={ prod.IdKey }>
                            <td>{ prod.ProductName }</td>
                            <td>{ prod.ProductDescription }</td>
                            <td>
                                <div className="deliveryBasket-tbody-flex">
                                    <button onClick={ () => minus(((pQuan === null) ? prod.ProductQuantity : pQuan), prod.IdKey, prod.ProductPerItemPrice) }><i className="icon minus"></i></button>
                                    <input onChange={ e => setPQuan(e.target.value) } value={ (pQuan === null) ? prod.ProductQuantity : pQuan } type="number" />
                                    <button onClick={ () => plus(((pQuan === null) ? prod.ProductQuantity : pQuan), prod.IdKey, prod.ProductPerItemPrice) }><i className="icon plus"></i></button>
                                </div>
                            </td>
                            <td>{ (pQuan === null) ? prod.ProductPrice : (prod.ProductPerItemPrice * pQuan).toFixed(2) } zł</td>
                            <td><button onClick={ () => removeItemFromBasket(prod.IdKey) }><i className="icon delete"></i></button></td>
                        </tr>
                        )) }
                    </tbody>
                </table>
            </div>
            <div className="deliveryBasket-final">
                <div className="deliveryBasket-final-card">
                    { isBasket === 0 &&
                        <h2>Nie czekaj, zamów coś i ciesz się smakiem</h2>                                            
                    }
                    { isBasket !== 0 && 
                    <>
                    <div className="deliveryBasket-final-card-header">
                        <h2>Podsumowanie:</h2>
                    </div>
                    <div className="deliveryBasket-final-card-content">
                        <p>Razem: { totalPrice } zł</p>
                        <p>Dostawa: 0 zł</p>
                    </div>
                    <div className="deliveryBasket-final-card-footer">
                        <Link to="/delivery/finalize"><button><i className="icon sticky note outline"></i>Finalizowanie</button></Link>
                    </div>
                    </>
                    }
                </div>
            </div>
        </div>
    );
};

export default DeliveryBasket;