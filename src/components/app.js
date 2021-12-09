/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import boughtStocks from './boughtStocks';
import dashboard from './dashboard';
import buyComponent from './maincomponent';

// eslint-disable-next-line import/prefer-default-export
export class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/" component={dashboard} exact={true}/>
                        <Route path="/buystocks" component={buyComponent} exact={true}/>
                        <Route path="/sellstocks" component={boughtStocks} exact={true}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
