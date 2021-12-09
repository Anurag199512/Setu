/* eslint-disable no-restricted-syntax */
import React from 'react';
import '../css/dashboard.css';
import { selectedStock, updatedPrice, buyStock } from './utils';
import '../css/button.css';
import '../css/priceColor.css';

export default class Liststock extends React.Component {
    // eslint-disable-next-line no-restricted-syntax
    constructor(props) {
        super(props);
        let exp = {};
        exp = selectedStock();
        let data = [];
        if (!exp.error) { data = exp.getBody(); }

        this.state = {
            stocks: (!exp.error) ? JSON.parse(data) : {},
            stockPrice: Array(((!exp.error) ? JSON.parse(data) : {}).length).fill(0),
            flag: Array(((!exp.error) ? JSON.parse(data) : {}).length).fill(undefined)
        };
    }

    // eslint-disable-next-line no-restricted-syntax
    comparePrice(prevState, exp, data, newPrice) {
        const flag = [];
        if (newPrice) {
            newPrice.map((stk, i) => {
                flag.push((stk !== prevState.stockPrice[i] && prevState.stockPrice[i]) ? stk > prevState.stockPrice[i] : undefined);
            });
        }
        return ({
            stocks: ((!exp.error) && data.length > 0 && data !== undefined) ? JSON.parse(data) : prevState.stocks,
            stockPrice: newPrice || prevState.stockPrice,
            flag
        });
    }

    tick() {
        let exp = {};
        exp = selectedStock();
        let data = [];
        if (!exp.error) { data = exp.getBody(); }

        const newPrice = updatedPrice(data);
        this.setState((prevState) => (this.comparePrice(prevState, exp, data, newPrice)));
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    claimStock(e) {
        e.preventDefault();
        for (let i = 0; i < e.target.elements.length; ++i) {
            const { id } = e.target.elements[i];
            const units = e.target.elements[i].value;
            const stockName = e.target.elements[i].className;

            if (units.length > 0) {
                buyStock(id, units, stockName);
            }
        }
    }

    render() {
        return (
            <div>
                <div id='buyingFailed'></div>
            Enter stock units to buy.Empty fields will be treated as 0 units.<br/><br/>
            Available Stock details<br/><br/>

                <form onSubmit = {this.claimStock}>
                    <table>
                        <thead>
                            <tr className = 'rowheader'>
                                <td>Name</td>
                                <td>Price of 1 stock</td>
                                <td>No of units to buy</td>
                            </tr>
                            <tr><td><br/></td></tr>
                        </thead>
                        <tbody>
                            {
                                this.state.stocks.data ? this.state.stocks.data.map((stk, i) => (<tr key={stk.id} className= {this.state.flag[i] !== undefined ? this.state.flag[i] ? 'priceUp' : 'priceDown' : 'samePrice'}>
                                    <td>{stk.name}</td>
                                    <td>{stk.price}<span>&nbsp;</span>{ this.state.flag[i] !== undefined ? this.state.flag[i] ? (<span>&#8593;</span>) : (<span>&#8595;</span>) : undefined}</td>
                                    <td><input className={stk.name} id={stk.id} type='number'/></td>
                                </tr>)) : undefined
                            }
                        </tbody>
                    </table>
                    <br/><br/>
                    <button className='buyButton' type='submit'>Buy Stocks</button>
                </form>

            </div>

        );
    }
}
