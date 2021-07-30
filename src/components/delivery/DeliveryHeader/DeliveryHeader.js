import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DeliveryHeader.css';
import { auth } from '../../../firebaseConfig';
import { useHistory } from 'react-router-dom';
import SearchProducts from '../DeliverySearchProducts/SearchProducts';
import $ from 'jquery';

const DeliveryHeader = ({ user }) => {

    const history = useHistory();

    // useEffect(() =>{
    //     auth.onAuthStateChanged(user => {
    //         if (!user) {
    //             history.push('/');
    //         }
    //     });
    // }, [user, history]);

    useEffect(() => {
        $('#toggle').click(function() {
            $(this).toggleClass('active');
            $('#overlay').toggleClass('open');
        });
    }, [])

    const logout = () => {
        auth.signOut().then(() => {
           console.log('wylogowany');
           history.push('/delivery');
        });
    }

    return(
        <>
        <div className="deliveryHeader">
            <div className="deliveryHeader-topbar">
                <div className="deliveryHeader-topbar-img-logo">
                    <img alt="logo" src="/delivery/assets/images/burgerlogo.png" />
                </div>
                <ul>
                    { !user && 
                        <li>
                            <i className="icon user"></i>
                            <Link to="/delivery/login">Logowanie/Rejestracja</Link>
                        </li>
                    }
                    { user &&
                    <>
                        <li>
                            <button onClick={ logout }><i className="icon logout" style={{ color: 'white' }}></i> Wyloguj { user }</button>
                        </li>
                        <li className="li-history">
                            <Link to="/delivery/history"><i className="icon history"></i></Link>
                        </li>
                    </>
                    }
                    <li>
                        <div className="dvl-search-container">
                            <SearchProducts />
                        </div>
                    </li>
                </ul>
            </div>
            <div className="deliveryHeader-bottombar">
                <ul>
                    <li>
                        <Link to="/delivery/menu">Menu</Link>
                    </li>
                    { user && 
                    <>
                        <li>
                            <Link to="/delivery/fav">Ulubione</Link>
                        </li>
                        <li>
                            <Link to="/delivery/profile">Profil</Link>
                        </li>
                        <li>
                            <Link to="/delivery/basket"><button><i className="icon shopping basket"></i>Koszyk</button></Link>
                        </li>
                    </>
                    }
                </ul>
            </div>
            <div className="button_container" id="toggle">
                <span className="top"></span>
                <span className="middle"></span>
                <span className="bottom"></span>
            </div>
        </div>
        <div className="overlay" id="overlay">
            <nav className="overlay-menu">
                <ul className="ul-top-moblie">
                    { !user && 
                        <li>
                            <i className="icon user"></i>
                            <Link to="/delivery/login">Logowanie/Rejestracja</Link>
                        </li>
                    }
                    { user &&
                        <li>
                            <button onClick={ logout }><i className="icon logout" style={{ color: 'white' }}></i> Wyloguj { user }</button>
                        </li>
                    }
                    <li>
                        <div className="dvl-search-container">
                            <SearchProducts />
                        </div>
                    </li>
                </ul>
                <ul className="ul-bottom-moblie">
                    <li>
                        <Link to="/delivery/menu">Menu</Link>
                    </li>
                    { user && 
                    <>
                        <li>
                            <Link to="/delivery/fav">Ulubione</Link>
                        </li>
                        <li>
                            <Link to="/delivery/profile">Profil</Link>
                        </li>
                        <li>
                            <Link to="/delivery/basket"><i className="icon shopping basket"></i>Koszyk</Link>
                        </li>
                    </>
                    }
                </ul>
            </nav>
        </div>
        </>
    );
};

export default DeliveryHeader;