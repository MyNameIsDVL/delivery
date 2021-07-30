import React, { createContext } from 'react';
import { rdb } from '../firebaseConfig';

export const PStore = createContext();

export class PStoreProvider extends React.Component {

    state = {
        products: [],
        basket_added: [],
        fav_added: [],
        restl: [],
        ordered: []
    };

    componentDidMount() {
        // products get
        rdb.ref(`products`).on('value', snapshot => {
            let productlist = [];
            snapshot.forEach(snap => {
                productlist.push(snap.val());
            });
            this.setState({ products: productlist });
        });
        // basket_added get 
        rdb.ref(`basket_added`).on('value', snapshot => {
            let productbasket = [];
            snapshot.forEach(snap => {
                productbasket.push(snap.val());
            });
            this.setState({ basket_added: productbasket });
        });
        // favourite_added get
        rdb.ref(`favourite_added`).on('value', snapshot => {
            let productfav = [];
            snapshot.forEach(snap => {
                productfav.push(snap.val());
            });
            this.setState({ fav_added: productfav });
        });
        // rest_location get
        rdb.ref(`rest_location`).on('value', snapshot => {
            let restLoc = [];
            snapshot.forEach(snap => {
                restLoc.push(snap.val());
            });
            this.setState({ restl: restLoc });
        });
        // orders_pay_on_delivery get
        rdb.ref(`orders_pay_on_delivery`).on('value', snapshot => {
            let orderspay = [];
            snapshot.forEach(snap => {
                orderspay.push(snap.val());
            });
            this.setState({ ordered: orderspay });
        });
    }

    render() {
        return(
            <PStore.Provider value={{ products: [...this.state.products], basket_added: [...this.state.basket_added], fav_added: [...this.state.fav_added], restl: [...this.state.restl], ordered: [...this.state.ordered] }}>
                { this.props.children }
            </PStore.Provider>
        );
    }
}