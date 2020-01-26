import React from 'react';
import {connect} from 'react-redux';
import {selectedStock} from './utils';
import {Header} from './header';
import {Link} from 'react-router-dom';
import {Liststock} from './Liststock';
import '../css/header.css';

function Maincomponent(props){
 
    return (
        <div>
        <div>
            <Header balance={props.balance}/>
        </div>

        <div className='stockItems'>
            {
                props.statuscode ===200?<div> 
                <Liststock/></div> : <div>Error while fetching data. Check your connection !   
                Click here to go to <Link className='urlLink' to='/'>Home Page</Link> 
                <br/>
                </div>
            }
        </div>    
    </div>        
    )
}

const ConnectedMaincomponent=connect((state)=>{
    let  exp={}
    exp=selectedStock()
    var data=[]
    if(!exp.error)
        data=exp.getBody()

    return {
        stock:state.stockBought,
        balance:state.balance,
        allStock:(!exp.error)?JSON.parse(data):{},
        statuscode:exp.statusCode
        
    }
})(Maincomponent);

export default  ConnectedMaincomponent;
