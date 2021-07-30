import React, { useState, useEffect } from 'react';
import { auth } from '../../../firebaseConfig';
import './DeliveryForgotPassword.css';

const DeliveryForgotPassword = () => {

    const [newEmail, setNewEmail] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setSuccess('');
        setError('');
    }, [newEmail])

    const sendLink = (e) => {
        e.preventDefault();

        auth.sendPasswordResetEmail(newEmail).then(() => {
            setSuccess(`Link został wysłany na ${ newEmail }.`);
        }).catch(() => setError('Błąd. Spróbuj ponownie później.'));

    }

    return(
        <div className="deliveryForgotPassword">
            <form onSubmit={ sendLink }>
                <h1>Odzyskiwanie hasła</h1>
                <div className="deliveryForgotPassword-field">
                    <label>Podaj adres email</label>
                    <input type="email" onChange={ e => setNewEmail(e.target.value) } value={ newEmail } placeholder="example@xxx.xxx" required />
                    <p>Na podany adres zostanie wysłany link.</p>
                </div>
                <button type="submit">Wyślij</button>
                { success !== '' && 
                    <div className="ui positive message">{ success }</div>
                }
                { error !== '' &&
                    <div className="ui negative message">{ error }</div>
                }
            </form>
        </div>
    );
}

export default DeliveryForgotPassword;