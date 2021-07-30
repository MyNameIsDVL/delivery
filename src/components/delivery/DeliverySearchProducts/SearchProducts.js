import React from 'react';
import './SearchProducts.css';
import { PStore } from '../../../store/PStore';
import { Link } from 'react-router-dom';

class SearchProducts extends React.Component {

    static contextType = PStore;

    constructor(props) {
        super(props);

        this.state = {
            suggest: [],
            arryProds: [],
            content: ''
        };
    }

    fetchDataToArray = () => {
        const { products } = this.context;
        const prods = products.map(prod => prod.ProductName);
        this.setState({ arryProds: prods });
    }

    onContentChanged = (e) => {
        var val = e.target.value;
        let suggest = [];
        if (val.length > 0) {
            const pattern = new RegExp(`^${ val }`, 'i');
            suggest = this.state.arryProds.sort().filter(item => pattern.test(item));
        }
        this.setState({ suggest: suggest, content: val });
    }

    renderSuggestMe() {
        if (this.state.suggest.length === 0) {
            return null;
        }
        return(
            <ul className="searchproduct-autocompile">
                { this.state.suggest.map((item, index) => <li onClick={ () => this.renderSuggestMeSelected(item) } key={ index }>{ item }</li>) }
            </ul>
        );
    }

    renderSuggestMeSelected(val) {
        this.setState({
            suggest: [],
            content: val
        });
    }

    render() {
        return(
            <>
            <div className="searchProducts">
                <div className="searchProducts-flex">
                    <input onKeyUp={ () => this.fetchDataToArray() } type="text" placeholder="Wyszukaj produkt..." onChange={ this.onContentChanged } value={ this.state.content } />
                    <Link to={ `/delivery/search/${ this.state.content }` }><button onClick={ () => this.setState({ content: '' }) }><i className="icon search"></i></button></Link>
                </div>
                { this.renderSuggestMe() }
            </div>
            </>
        );
    }  
}

export default SearchProducts;