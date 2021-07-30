import React from 'react';
import { rdb } from '../../../firebaseConfig';
import { PStore } from '../../../store/PStore';
import './SearchForRest.css';

class SearchForRest extends React.Component {

    static contextType = PStore;

    state = {
        coolerSuggestMe: [],
        content: '',
        success: '',
        error: ''
    };

    items = [
        'Kielce Szajnowicza Iwanowa 1/8',
        'Kielce Wiśniowa 2/4',
        'Kielce Jana Pawła 4/10',
        'Kielce Galeria echo 2p',
        'Warszawa Bartwińskiego 5/8',
        'Warszawa Tomczaka 5',
        'Warszawa Warszawska 14',
        'Warszawa Tulewicza 24',
        'Warszawa Wapniowa 12',
        'Warszawa Ulotna 5',
        'Warszawa Prusa 10',
        'Katowice Towarowa 13',
        'Katowice Zagajnik 24',
        'Katowice Wojtachowskiego 15',
        'Katowice Merry 23',
        'Katowice Janowskiego 11',
        'Katowice Gesler 43',
        'Gdynia Filipa 14',
        'Gdynia Ropuchy 43',
        'Gdynia Katowicka 12',
        'Gdynia Poligloty 14',
        'Gdynia Markowskiego 16',
        'Gdynia Utylizacji 44',
        'Gdynia Koszalińska 14'
    ];

    onContentChanged = e => {
        const val = e.target.value;
        let coolerSuggestMe = [];
        if (val.length > 0) {
            const pattern = new RegExp(`^${ val }`, 'i');
            coolerSuggestMe = this.items.sort().filter(item => pattern.test(item));
        }
        this.setState(() => ({ coolerSuggestMe, content: val }));
    }

    renderCoolerSuggestMe() {
        const { coolerSuggestMe } = this.state;
        if (coolerSuggestMe.length === 0) {
            return null;
        }
        return(
            <ul className="searchForRest-dvlul-autocompile">
                { coolerSuggestMe.map((item, index) => <li onClick={ () => this.renderCoolerSuggestMeSelected(item) } key={ index }>{ item }</li>) }
            </ul>
        );
    }

    renderCoolerSuggestMeSelected(val) {
        this.setState(() => ({
            content: val,
            coolerSuggestMe: []
        }));
    }

    componentDidMount() {
        const { restl } = this.context;

        restl.filter(rest => rest.IdUser === this.props.currentUserId).forEach(prod => {
            this.setState({ content: prod.RestLocation });
        });
    }

    pushToBasket() {
        const { restl } = this.context;

        const rest = restl.find(rest => rest.IdUser === this.props.currentUserId);

        if (rest === undefined) {
            if (this.state.content !== '') {
                var ref = rdb.ref('rest_location');
                var childRef = ref.push({
                    IdUser: this.props.currentUserId,
                    RestLocation: this.state.content
                }).catch(err => console.log(err.message));
                childRef.then(item => {
                    ref.child(item.key).update({
                        IdKey: item.key
                    }).then(() => console.log('dodano'));
                });
            }
        } else {
            if (this.state.content !== '') {
                var refu = rdb.ref('rest_location').child(rest.IdKey);
                refu.update({
                    RestLocation: this.state.content
                }).then(() => this.setState({ success: 'Zapisano zmianę' })).catch(err => console.log(err.message));
            }
        }
    }

    render() {
        const { content } = this.state;
        return(
            <div className="searchForRest">
                <button onClick={ () => this.pushToBasket() } className="searchForRest-btn"><i className="icon save"></i></button>
                <div className="searchForRest-content">
                    <div className="ui left icon input searchForRest-params">
                        <input value={ content } onChange={ this.onContentChanged } type="text" placeholder="np. Kielce Szajnowicza..." />
                        <i className="paper plane icon"></i>
                    </div>
                    { this.renderCoolerSuggestMe() }
                </div>
            </div>
        );
    }
}

export default SearchForRest;