import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import buyStock  from  './buy';
import sellStock  from  './sellStock';
import dashboard  from  './dashboard';


export class App extends React.Component{
    render(){
        return (
            <BrowserRouter>
            <div>
                <Switch>
                        <Route path="/" component={dashboard}  exact={true}/>
                        <Route path="/buystocks" component={buyStock} exact={true}/>
                        <Route path="/sellstocks" component={sellStock} exact={true}/>
                
                </Switch>
          
                </div>
            </BrowserRouter>
            )
    }
}