import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import './App.css';
import {App}  from  './components/app';
import {initializeState} from './components/utils'

let defaultState=initializeState();
 
function appRoot() {
  if(!defaultState.error)
    {
      var store=createStore((state= {stockBought:JSON.parse(defaultState).data.buys,balance:JSON.parse(defaultState).data.cash},action)=>{
      switch(action.type){

        case 'initialize':
            return { ...action.newState};      
        
        default:return state
    }
      
    }) 
}  


  if(!defaultState.error && store) {
     
  
    let displayMsg=(<div className="App">
    <Provider store={store}>
        <App/>
      </Provider>
    
  </div>);

    ReactDOM.render(displayMsg, document.getElementById('root'))
 
  }
  else{
    defaultState=initializeState();

    if(!defaultState.error && !!store)
      {    
        store.dispatch({
            type:'initialize',
            newState:{
              stockBought:JSON.parse(defaultState).data.buys,
              balance:JSON.parse(defaultState).data.balance
            } 
          })
      }   
    appRoot()
  }
}

const msg=(<div className="App">
<h3>Server connection problem kindly wait for few second to reconnect</h3>       
</div>);

ReactDOM.render(msg, document.getElementById('root'))
appRoot();
