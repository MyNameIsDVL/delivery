import React from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../../../firebaseConfig';
import './DeliveryRegister.css';

class DeliveryRegister extends React.Component {

    state = {
        username: '',
        phone: '',
        email: '',
        location: '',
        password: '',
        acceptPolise: false,
        error: '',
        eyeClassName: 'icon eye'
    };

    toggleEyePassVisible = () => {
        const idpass = document.querySelector('#id_pass');

        if (idpass.getAttribute('type') === 'password') {
            const type = 'text';
            this.setState({ eyeClassName: 'icon eye slash' });
            idpass.setAttribute('type', type);
        } else {
            const type = 'password';
            this.setState({ eyeClassName: 'icon eye' });
            idpass.setAttribute('type', type);
        }
    }

    register = e => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(call => {
            db.collection('users_info').doc(call.user.uid).set({
                UserName: this.state.username,
                Phone: this.state.phone,
                Email: this.state.email,
                Location: this.state.location,
                Polise: this.state.acceptPolise,
                Id: call.user.uid
            }).then(() => {
                this.setState({
                    username: '',
                    phone: '',
                    email: '',
                    location: '',
                    password: '',
                    acceptPolise: false,
                    error: ''
                });
                auth.currentUser.sendEmailVerification().then(() => {
                    console.log('Email weryfikacyjny wysłany!');
                })
                this.props.history.push('/delivery');
            }).catch(err => this.setState({ error: err.message }));
        }).catch(err => this.setState({ error: err.message }));
    }

    render() {
        return(
            <div className="deliveryRegister">
                <h2>Rejestracja</h2>
                <div className="deliveryRegister-form">
                    <div className="deliveryRegister-form-img">
                        <img alt="fastfood" src="/delivery/assets/images/pizza.jpg" />
                        <p><i className="icon info"></i>Administratorem Twoich danych osobowych jest Dvl-designs z siedzibą we Kielcach. Twoje dane osobowe będą przetwarzane w celu kierowania do Ciebie treści marketingowych w wybranej formie, a także w celach statystycznych i analitycznych administratora.</p>
                    </div>
                    <form className="form" onSubmit={ this.register }>
                        <div className="form-field">
                            <label>Nazwa użytkownika</label>
                            <input type="text" onChange={ e => this.setState({ username: e.target.value }) } value={ this.state.username } required />
                        </div>
                        <div className="form-field">
                            <label>Numer telefonu</label>
                            <input type="number" onChange={ e => this.setState({ phone: e.target.value }) } value={ this.state.phone } required />
                        </div>
                        <div className="form-field">
                            <label>Email</label>
                            <input type="email" onChange={ e => this.setState({ email: e.target.value }) } value={ this.state.email } required />
                        </div>
                        <div className="form-field">
                            <label>Adres dostawy</label>
                            <input type="text" onChange={ e => this.setState({ location: e.target.value }) } value={ this.state.location } required />
                        </div>
                        <div className="form-field pass_cont">
                            <label>Hasło</label>
                            <input type="password" onChange={ e => this.setState({ password: e.target.value }) } value={ this.state.password } id="id_pass" required />
                            <i onClick={ () => this.toggleEyePassVisible() } className={ this.state.eyeClassName }></i>
                        </div>
                        <div className="form-field dvl-flex">
                            <input type="checkbox" onChange={ e => this.setState({ acceptPolise: e.target.checked }) } checked={ this.state.acceptPolise } required/>
                            <p><i className="icon star"></i> Zapoznałam(em) się i akceptuję Regulamin oraz Politykę Prywatności</p>
                        </div>
                        <button type="submit">Dołącz do nas</button>
                        <Link to="/delivery/login">Posiadasz konto?</Link>
                    </form>
                </div>
                { this.state.error && <div className="ui negative message dvl-message-r">{ this.state.error }</div> }
            </div>
        );
    }   
}

export default DeliveryRegister;