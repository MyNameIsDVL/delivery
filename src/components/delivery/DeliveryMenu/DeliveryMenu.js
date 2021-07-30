import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DeliveryMenu.css';
import DeliverySliderMenu from '../DeliverySliderMenu/DeliverySliderMenu';
import DeliverySliderDinner from '../DeliverySliderDinners/DeliverySliderDinners';

import { PStore } from '../../../store/PStore';

const DeliveryMenu = () => {

    const { products } = useContext(PStore);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return(
        <div className="deliveryMenu">
            { products.length !== 0 && 
            <h1>Polecane dla Ciebie</h1>
            }
            <DeliverySliderMenu single="single/" />
            { products.length !== 0 && 
            <h1>Polecane obiady</h1>
            }
            <DeliverySliderDinner />
            { products.length !== 0 && 
            <h1 className="all-menu">Całe menu</h1>
            }
            <div className="deliveryMenu-all-products">
                { products.map(product => ( 
                <div className="deliveryMenu-card" key={ product.Id }>
                    <div className="deliveryMenu-card-img">
                        <Link to={ `single/${ product.Id }` }><img alt="food" src={ product.ProductUrl } /></Link>
                    </div>
                    <div className="deliveryMenu-card-content">
                        <h3>{ product.ProductName }</h3>
                        <p>{ product.ProductDescription }</p>
                        <Link to={ `single/${ product.Id }` }><span>{ product.ProductPrice } zł</span></Link>
                    </div>
                </div>
                )) }
            </div>
            { products.length === 0 && 
            <div className="ui active dimmer inverted dvl-color-bg-loader">
                <div className="ui large text loader dvl-color-loader">Proszę czekać</div>
            </div>
            }
        </div>
    );
};

export default DeliveryMenu;