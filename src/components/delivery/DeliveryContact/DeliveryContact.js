import React, { useState } from 'react';
import { rdb } from '../../../firebaseConfig';
import './DeliveryContact.css';

const DeliveryContact = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const sendContact = (e) => {
        e.preventDefault();
        const ref = rdb.ref('contact_form');
        const childRef = ref.push({
            Name: name,
            Email: email,
            Title: title,
            Description: desc
        }).catch(err => setError('Nie udało się wysłać wiadomości. Spróbuj ponownie póżniej.'));
        childRef.then(item => {
            ref.child(item.key).update({
                IdKey: item.key
            });
        }).then(() => {
            setName('');
            setEmail('');
            setTitle('');
            setDesc('');
            setSuccess('Pomyślnie wysłano. Dziękujemy.')
        });
    }

    return(
        <div className="deliveryContact">
            <div className="deliveryContact-img">
                <img alt="contact-img" src="/delivery/assets/images/bannerDeliverFoodApp.png" />
            </div>
            <div className="deliveryContact-contact-form">
                <form onSubmit={ sendContact }>
                    <div className="group-field">
                        <label>Imię i nazwisko</label>
                        <input type="text" onChange={ e => setName(e.target.value) } value={ name } required />
                    </div>
                    <div className="group-field">
                        <label>Email</label>
                        <input type="email" onChange={ e => setEmail(e.target.value) } value={ email } required />
                    </div>
                    <div className="group-field">
                        <label>Tytuł</label>
                        <input type="text" onChange={ e => setTitle(e.target.value) } value={ title } required />
                    </div>
                    <div className="group-field">
                        <label>Treść</label>
                        <textarea onChange={ e => setDesc(e.target.value) } value={ desc } required></textarea>
                    </div>
                    <button type="submit">Wyślij</button>
                    { success !== '' &&
                        <div className="ui positive message">{ success }</div>
                    }
                    { error !== '' &&
                        <div className="ui positive message">{ error }</div>
                    }
                </form>
                <p>Administratorem Twoich danych osobowych jest Dvl-designs z siedzibą we Kielcach. Będziemy przetwarzali Twoje dane w celu udzielenia odpowiedzi na Twoje zapytanie, a także realizacji naszych prawnie uzasadnionych interesów. Masz prawo dostępu do Twoich danych, żądania ich sprostowania, usunięcia, ograniczenia przetwarzania i przenoszenia, a także prawo wniesienia sprzeciwu. Możesz się z nami skontaktować np. wysyłając e-mail delivery.sup.app@gmail.com.</p>
            </div>
        </div>
    );
}

export default DeliveryContact;