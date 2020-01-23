import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Update  from  './buy'
import dashboard  from  './dashboard'


export class Mainapp extends React.Component{
    render(){
        return (
            <BrowserRouter>
            <div>
 
                <Switch>
                              
                        <Route path="/" component={dashboard}  exact={true}/>
                        <Route path="/buy_sell" component={Update} exact={true}/>
                
                </Switch>
          
                </div>
            </BrowserRouter>
            )
    }
}