import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import DeliveryHeader from './delivery/DeliveryHeader/DeliveryHeader';
import DeliveryHome from './delivery/DeliveryHome/DeliveryHome';
import DeliveryLogin from './delivery/DeliveryLogin/DeliveryLogin';
import DeliveryRegister from './delivery/DeliveryRegister/DeliveryRegister';
import DeliveryProfile from './delivery/DeliveryProfile/DeliveryProfile';
import DeliveryMenu from './delivery/DeliveryMenu/DeliveryMenu';
import DeliveryFooter from './delivery/DeliveryFooter/DeliveryFooter';
import DeliverySingleProduct from './delivery/DeliverySingleProduct/DeliverySingleProduct';
import DeliveryBasket from './delivery/DeliveryBasket/DeliveryBasket';
import DeliveryFavourite from './delivery/DeliveryFavourite/DeliveryFavourite';
import DeliveryFinalize from './delivery/DeliveryFinalize/DeliveryFinalize';
import DeliveryPaypal from './delivery/DeliveryPaypal/DeliveryPaypal';
import DeliveryGooglePay from './delivery/DeliveryGooglePay/DeliveryGooglePay';
import DeliveryNotFound from './delivery/DeliveryNotFound/DeliveryNotFound';
import DeliveryForgotPassword from './delivery/DeliveryProfile/DeliveryForgotPassword';
import DeliverySearchProducts from './delivery/DeliverySearchProducts/DeliverySearchProducts';
import PaymentThanks from './delivery/PaymentSuccessThanks/PaymentThanks';
import DeliveryHistory from './delivery/DeliveryHistory/DeliveryHistory';
import DeliveryContact from './delivery/DeliveryContact/DeliveryContact';

import { auth, db } from '../firebaseConfig';
import { PStoreProvider } from '../store/PStore';

class App extends React.Component {

    state = {
        user: null,
        currentUserId: null,
        currentPhone: null,
        currentLocation: '',
        currentUserName: '',
        currentEmail: ''
    }
    
    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('users_info').doc(user.uid).get().then(snapshot => {
                    this.setState({
                        user: snapshot.data().UserName,
                        currentUserId: user.uid,
                        currentPhone: snapshot.data().Phone,
                        currentLocation: snapshot.data().Location,
                        currentUserName: snapshot.data().UserName,
                        currentEmail: snapshot.data().Email
                    });
                });
            }
            else {
                this.setState({
                    user: null,
                    currentUserId: '',
                    currentPhone: null,
                    currentLocation: '',
                    currentUserName: '',
                    currentEmail: ''
                });
            }
        });
    }

    render() {
        return(
            <PStoreProvider>
                <BrowserRouter>
                    <div>
                        <DeliveryHeader user={ this.state.user } />
                        <div className="dvl-container">
                            <Switch>
                                <Route path="/delivery" exact component={ () => <DeliveryHome user={ this.state.user } currentUserId={ this.state.currentUserId } /> } />
                                <Route path="/delivery/login" exact component={ DeliveryLogin } />
                                <Route path="/delivery/register" exact component={ DeliveryRegister } />
                                <Route path="/delivery/menu" exact component={ DeliveryMenu } />
                                <Route path="/delivery/single/:id" exact component={ () => <DeliverySingleProduct currentUserId={ this.state.currentUserId } user={ this.state.user } /> } />
                                <Route path="/delivery/fav" exact component={ () => this.state.user ? <DeliveryFavourite currentUserId={ this.state.currentUserId } /> : <DeliveryLogin /> }  />
                                <Route path="/delivery/profile" exact component={ () => this.state.user ? <DeliveryProfile currentUserId={ this.state.currentUserId } currentPhone={ this.state.currentPhone } currentLocation={ this.state.currentLocation } currentUserName={ this.state.currentUserName } currentEmail={ this.state.currentEmail } /> : <DeliveryLogin /> } />
                                <Route path="/delivery/basket" exact component={ () => this.state.user ? <DeliveryBasket currentUserId={ this.state.currentUserId } /> : <DeliveryLogin /> } />
                                <Route path="/delivery/finalize" exact component={ () => this.state.user ? <DeliveryFinalize currentUserId={ this.state.currentUserId } currentPhone={ this.state.currentPhone } currentLocation={ this.state.currentLocation } /> : <DeliveryLogin /> } />
                                <Route path="/delivery/paypal" exact component={ () => this.state.user ?  <DeliveryPaypal currentUserId={ this.state.currentUserId } currentPhone={ this.state.currentPhone } currentLocation={ this.state.currentLocation } currentUserName={ this.state.currentUserName } currentEmail={ this.state.currentEmail } /> : <DeliveryLogin /> } />
                                <Route path="/delivery/googlepay" exact component={ () => this.state.user ? <DeliveryGooglePay currentUserId={ this.state.currentUserId } /> : <DeliveryLogin /> } />
                                <Route path="/delivery/resetpassword" exact component={ () => <DeliveryForgotPassword /> } />
                                <Route path="/delivery/search/:id" exact component={ () => <DeliverySearchProducts /> } />
                                <Route path="/delivery/paymentsuccess/:id" component={ () => this.state.user ? <PaymentThanks /> : <DeliveryLogin /> } />
                                <Route path="/delivery/history" component={ () => this.state.user ? <DeliveryHistory user={ this.state.user } currentUserId={ this.state.currentUserId } /> : <DeliveryLogin /> } />
                                <Route path="*" component={ DeliveryNotFound } />
                            </Switch>
                        </div>
                        <DeliveryContact />
                        <DeliveryFooter user={ this.state.user } />
                    </div>
                </BrowserRouter>
            </PStoreProvider>
        );
    }  
}

export default App;