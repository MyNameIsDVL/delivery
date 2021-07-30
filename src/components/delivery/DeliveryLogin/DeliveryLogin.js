import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../../firebaseConfig';
import './DeliveryLogin.css';

class DeliveryLogin extends React.Component {

    state = {
        email: '',
        password: '',
        error: ''
    };

    onSubmit = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            this.setState({
                email: '',
                password: '',
                error: ''
            });
            this.props.history.push('/delivery');
        }).catch(err => this.setState({ error: err.message }));
    }

    render() {
        return(
            <div className="deliveryLogin">
                <h2>Logowanie</h2>
                <div className="deliveryLogin-form">
                    <form className="form" onSubmit={ this.onSubmit }>
                    <div className="form-field">
                        <label>Email</label>
                        <input type="email" name="email" onChange={ e => this.setState({ email: e.target.value }) } value={ this.state.email } required />
                    </div>
                    <div className="form-field">
                        <label>Hasło</label>
                        <input type="password" name="password" onChange={ e => this.setState({ password: e.target.value }) } value={ this.state.password } required />
                    </div>
                        <button type="submit">Zaloguj się</button>
                        <Link to="/delivery/register">Nie masz konta?</Link>
                        <Link to="/delivery/resetpassword">Zapomniałeś/aś hasła/o?</Link>
                    </form>
                    <div className="deliveryLogin-form-img">
                        <img alt="fastfood" src="/delivery/assets/images/lazania.jpg" />
                    </div>
                </div>
                { this.state.error && <div className="ui negative message dvl-message-l">{ this.state.error }</div> }
            </div>
        );
    }
}

export default DeliveryLogin;