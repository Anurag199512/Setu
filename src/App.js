import React from 'react';
import {Provider} from 'react-redux'
//import Thunk from 'redux-thunk'
import {createStore} from 'redux'
import './App.css';
import {Mainapp}  from  './actions/mainapp'



var store=createStore((state= {stockBought:[],balance:200},action)=>{
  switch(action.type){
    case 'buyStock':
        //console.log(action.ob)
        //tid=action.ob.id

        return [
            ...state,
            action.ob
        ];
    case 'sellStock':
    //console.log(action.id)
        return state.filter((ob)=>{
            return ob.id!==action.id
        })
    
        default:return state
}
   
}) 
  
function App() {
  return (
    <div className="App">
       
        <Provider store={store}>
          <Mainapp/>
        </Provider>
       
    </div>
  );
}

export default App;
