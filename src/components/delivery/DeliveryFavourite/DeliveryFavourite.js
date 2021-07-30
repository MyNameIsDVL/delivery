import React, { useContext, useState, useEffect } from 'react';
import { PStore } from '../../../store/PStore';
import { Link } from 'react-router-dom';
import { rdb } from '../../../firebaseConfig';
import './DeliveryFavourite.css';

const DeliveryFavourite = ({ currentUserId }) => {

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const { fav_added } = useContext(PStore);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const isFavourite = fav_added.filter(bas => bas.IdUser === currentUserId).length;

    const removeItemFav = (idkey) => {
        rdb.ref('favourite_added').child(idkey).remove().then(() => {
            setSuccess('');
            setError('');
        }).then(() => setSuccess('Usunięto wybrany produkt z ulubionych'))
        .catch(err => setError('Błąd. Nie udało się usunąć wybranego produktu'));
    }

    return(
        <>
        <div className="deliveryFavourite">
            <div className="deliveryFavourite-grid">
            { fav_added.filter(bas => bas.IdUser === currentUserId).map(prod => (
                <div className="deliveryFavourite-card" key={ prod.IdKey }>
                    <h2>{ prod.ProductName }</h2>
                    <p>{ prod.ProductDescription }</p>
                    <Link to={ `/delivery/single/${ prod.ProductId }` }><i className="icon eye"></i></Link>
                    <button onClick={ () => removeItemFav(prod.IdKey) }><i className="icon delete"></i></button>
                </div>
            )) }    
            </div>
        </div>
        {
            success !== '' &&
            <p className="ui positive message">{ success }</p>
        }
        {
            error !== '' &&
            <p className="ui negative message">{ error }</p>
        }
        { isFavourite === 0 && 
            <div className="deliveryFavourite-no-fav-products">
                <div className="deliveryFavourite-no-fav-products-circle">
                    <img alt="star" src="/delivery/assets/images/Star_icon.png" />
                </div>
                <h2>Twoja lista jest pusta</h2>
            </div>
        }
        </>
    );
};

export default DeliveryFavourite;