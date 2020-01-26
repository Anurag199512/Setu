import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';


// function renderApp(){
//     console.log('s')
//     ReactDOM.render(<App />, document.getElementById('root'));
// }
// //setInterval(renderApp,200)
// renderApp();


 
import {Provider} from 'react-redux';
//import Thunk from 'redux-thunk'
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
            
        case 'buyStock':
            return [
                ...state,
                action.ob
            ];
        case 'sellStock':

          return state.filter((ob)=>{
                return ob.id!==action.id;
            })
        
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

serviceWorker.unregister();
