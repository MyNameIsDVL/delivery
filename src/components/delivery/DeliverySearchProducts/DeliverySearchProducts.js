import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PStore } from '../../../store/PStore';
import './DeliverySearchProducts.css';

const DeliverySearchProducts = () => {

    const { products } = useContext(PStore);

    const pathId = window.location.pathname.substr(17);

    const prodPatternLen = products.filter(p => p.ProductName === pathId.replaceAll("%20", " ")).length;

    return(
        <div className="deliverySearchProducts">
            {
                products.filter(p => p.ProductName === pathId.replaceAll("%20", " ")).map(product => (

                <div className="deliveryMenu-card" key={ product.Id }>
                    <div className="deliveryMenu-card-img">
                        <img alt="food" src={ product.ProductUrl } />
                    </div>
                    <div className="deliveryMenu-card-content">
                        <h3>{ product.ProductName }</h3>
                        <p>{ product.ProductDescription }</p>
                        <span>{ product.ProductPrice } zł</span>
                        <Link to={ `/delivery/single/${ product.Id }` }><i className="icon eye"></i></Link>
                    </div>
                </div>
                ))
            }
            { prodPatternLen === 0 &&
                <div className="ui primary message">Brak produktów</div>
            }
        </div>
    );

}

export default DeliverySearchProducts;