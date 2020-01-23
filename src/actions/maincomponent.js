import React from 'react';
import {connect} from 'react-redux'
 
import {selectedstock} from './additional'
import {Header} from './header'
import {Liststock} from './Liststock'
import '../css/header.css';

function Maincomponent(props){
    console.log(props)
    return (
        <div>

        <div>
            <Header balance={props.balance}/>
        </div>

        <div className='stockItems'>
            {
                props.statuscode ===200?<div> 
                <Liststock stocks={props.allStock}/></div> : <div>Error while fethcing data. Check your connection !
                Clike here to refresh <br/> <button type="utton" onClick="location.reload();">Load stock</button>
                </div>
            }
        </div>    
        
        </div>
        
    )
}


const ConnectedMaincomponent=connect((state)=>{
    let  exp={}
    //console.log(state)
    exp=selectedstock()
    //console.log('E',exp)
    var data=[]

    if(!exp.error)
        data=exp.getBody()
    //console.log(data)

    return {
        stock:state.stockBought,
        balance:state.balance,
        allStock:(!exp.error)?JSON.parse(data):{},
        statuscode:exp.statusCode
        
    }
})(Maincomponent);

export default  ConnectedMaincomponent;
