import React, { useContext, useState, useEffect } from 'react';
import DeliverySliderMenu from '../DeliverySliderMenu/DeliverySliderMenu';
import { PStore } from '../../../store/PStore';
import { rdb } from '../../../firebaseConfig';
import { useHistory } from 'react-router-dom';
import './DeliverySingleProduct.css';

const DeliverySingleProduct = ({ currentUserId, user }) => {

    const history = useHistory();

    const [countVal, setCountVal] = useState(1);
    const [error, setError] = useState('');

    const { products } = useContext(PStore);
    const { fav_added } = useContext(PStore);
    const { basket_added } = useContext(PStore);

    const pathId = window.location.pathname.substr(17);

    const prodslength = products.filter(fav => fav.Id === pathId).length;

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (countVal === 0) {
            setCountVal(1);
        }
    }, [countVal])

    const minus = (val) => {

        if (val < 1) {
            setCountVal(1);
        } else {
            setCountVal(val - 1);
        }
    };

    const plus = (val) => {

        setCountVal(val + 1);
    };

    const pushToFavourite = (pCategory, pDesc, pId, pName, pPrice) => {

        const fav = fav_added.find(fav => fav.IdUser === currentUserId && fav.ProductId === pId);

        if (!fav) {
            var ref = rdb.ref('favourite_added');
            var childRef = ref.push({
                IdUser: currentUserId,
                ProductCategory: pCategory,
                ProductDescription: pDesc,
                ProductId: pId,
                ProductName: pName,
                ProductPrice: pPrice
            }).catch(err => console.log('błąd podczas pushowania danych', err));
            childRef.then(item => {
                ref.child(item.key).update({
                    IdKey: item.key
                }).then(() => history.push('/delivery/fav'));
            });
        } else {
            setError('Ten produkt już znajduje się w ulubionych.');
        }
    }

    const pushToBasket = (pCategory, pDesc, pId, pName, pPrice, pQuan, pPerItemPrice) => {

        const basket = basket_added.find(basket => basket.IdUser === currentUserId && basket.ProductId === pId);

        if (!basket) {
            var ref = rdb.ref('basket_added');
            var childRef = ref.push({
                IdUser: currentUserId,
                ProductCategory: pCategory,
                ProductDescription: pDesc,
                ProductId: pId,
                ProductName: pName,
                ProductPrice: pPrice,
                ProductQuantity: pQuan,
                ProductPath: pathId,
                ProductPerItemPrice: pPerItemPrice
            }).catch(err => console.log('błąd podczas pushowania danych', err));
            childRef.then(item => {
                ref.child(item.key).update({
                    IdKey: item.key
                }).then(() => history.push('/delivery/basket'));
            });
        } else {
            setError('Ten produkt już znajduje się w koszyku.');
        }
    }

    return(
        <>
        { prodslength === 0 && 
        <div className="ui active dimmer inverted dvl-color-bg-loader">
            <div className="ui large text loader dvl-color-loader">Proszę czekać</div>
        </div>
        }
        { products.filter(fav => fav.Id === pathId).map(prod => (
        <div className="deliverySingleProduct" key={ prod.Id }>
            <div className="deliverySingleProduct-img">
                <img alt="food" src={ prod.ProductUrl } />
            </div>
            <div className="deliverySingleProduct-content">
                <h1>{ prod.ProductName }</h1>
                <p>{ prod.ProductDescription }</p>
                <div className="deliverySingleProduct-counter">
                    <button onClick={ () => minus(countVal) } className="deliverySingleProduct-minus"><i className="icon minus"></i></button>
                    <input type="number" alt="count" onChange={ (e) => { setCountVal(e.target.value) } } value={ countVal }/>
                    <button onClick={ () => plus(countVal) } className="deliverySingleProduct-plus"><i className="icon plus"></i></button>
                </div>
                <div className="deliverySingleProduct-totalPrice">
                    <h2>{ (prod.ProductPrice * countVal).toFixed(2) }</h2>
                    <p>zł</p>
                </div>
                { user &&
                    <button onClick={ () => pushToBasket(prod.ProductCategory, prod.ProductDescription, prod.Id, prod.ProductName, (prod.ProductPrice * countVal).toFixed(2), countVal, prod.ProductPrice) } type="submit"><i className="icon shopping basket"></i>Dodaj do koszyka</button>
                }
                { !user &&
                    <button disabled style={{ backgroundColor: '#999' }} type="submit"><i className="icon shopping basket"></i>Dodaj do koszyka</button>
                }
                { user &&
                    <button onClick={ () => pushToFavourite(prod.ProductCategory, prod.ProductDescription, prod.Id, prod.ProductName, prod.ProductPrice) } className="heart-to-favourite"><i className="icon heart"></i></button>
                }
                { error &&
                    <div className="ui negative message">{ error }</div>
                }
            </div>
        </div>
        )) }  
        <h1 className="prod-for-you">Polecane dla Ciebie</h1>
        <DeliverySliderMenu single="../single/" />
        </>
    );
};

export default DeliverySingleProduct;