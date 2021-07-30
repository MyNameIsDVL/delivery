import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../firebaseConfig';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';
import './DeliveryProfile.css';

const DeliveryProfile = ({ currentUserId, currentPhone, currentLocation, currentUserName, currentEmail }) => {

    const [username, setUsername] = useState(currentUserName);
    const [phone, setPhone] = useState(currentPhone);
    const [email, setEmail] = useState(currentEmail);
    const [location, setLocation] = useState(currentLocation);
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const reauthenticate = (currentPassword) => {
        var user = auth.currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const updateProfile = (e) => {
        // first email auth
        e.preventDefault();

        reauthenticate(password).then(() => {
            var user = auth.currentUser;
            user.updateEmail(email).then(() => {
                console.log("Zmieniono email");

                db.collection('users_info').doc(currentUserId).update({
                    UserName: username,
                    Phone: phone,
                    Location: location,
                    Email: email
                }).then(() => {
                    setSuccess('');
                    setError('');
                })

                setSuccess('Zapisano zmiany');
            }).catch(() => setError('Błąd podczas zapisu'));
        }).catch((error) => { console.log(error); });

    }

    return(
        <div className="deliveryProfile">
            <div className="deliveryProfile-box">
                <h2>Ustawienia</h2>
                <p>Możesz tutaj zmienić swoje ustawienia profilowe</p>
                <form onSubmit={ updateProfile }>
                    <div className="deliveryProfile-form-field">
                        <label>Nazwa użytkownika</label>
                        <input type="text" onChange={ e => setUsername(e.target.value) } value={ username } required />
                    </div>
                    <div className="deliveryProfile-form-field">
                        <label>Telefon</label>
                        <input type="number" onChange={ e => setPhone(e.target.value) } value={ phone } required />
                    </div>
                    <div className="deliveryProfile-form-field">
                        <label>Email</label>
                        <input type="email" onChange={ e => setEmail(e.target.value) } value={ email } required />
                    </div>
                    <div className="deliveryProfile-form-field">
                        <label>Adres dostawy</label>
                        <input type="text" onChange={ e => setLocation(e.target.value) } value={ location } required />
                    </div>
                    <div className="deliveryProfile-form-field">
                        <p>Podaj swoje obecne hasło w celach weryfikacyjnych. Zgadzasz się w ten sposób na zmianę swoich danych.</p>
                        <input type="password" onChange={ e => setPassword(e.target.value) } value={ password } placeholder="Podaj tu swoje obecne hasło..." required />
                    </div>
                    <button type="submit">Zapisz</button>
                </form>
                { success !== '' && 
                    <div className="ui positive message">{ success }</div>
                }
                { error !== '' &&
                    <div className="ui negative message">{ error }</div>
                }
                <div className="deliveryProfile-reset-password">
                    <label>Chcesz zmienić hasło?</label>
                    <Link to="/delivery/resetpassword"><button>Resetuj</button></Link>
                </div>
            </div>
        </div>
    );
};

export default DeliveryProfile;