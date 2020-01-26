import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {selectedStock} from './utils';
import {Header} from './header';;

function getTotalUnits(unit){
    let total=0;
    for(let i=0;i<unit.length;++i){
        total=total+Number(unit[i])
    }
    return total;
}
function reload() {
    document.location.reload(document.URL + '#stockList');
    //document.getElementById('stockList').reload(document.URL + '#stockList');
  }
  
  setTimeout(reload, 20000);

function stocksBought(props){
    console.log(props)
    return(
    <div>    
            <div>  
              <Header balance={props.balance}/>
            </div>
        <div className='stockItems'>       
        {
            props.statuscode ===200?
            <div> 
            <h2>Your stock collections</h2>
            <table>
            <thead>
            <tr className='rowheader'>
                <td>Name</td>
                <td>No of units Available</td>

            </tr>
            </thead>
            <tbody>
            {
                props.stock.map((stk)=>{
                    //console.log(stk)
                    return (<tr key={stk.id}>

                            <td>{stk.name}</td>
                            <td>{getTotalUnits(stk.units)}</td>
                            
                        </tr>)
                })
            }
            </tbody>
            </table>

            <h2>Current pricing of stocks</h2>
            <table id='stockList'>
                    <thead>
                    <tr className='rowheader'>
                        <td>Name</td>
                        <td>Price of 1 stock</td>
                        <td>Units to Sell</td>

                    </tr>
                    </thead>
                    <tbody>
                    {
                        props.allStock.data.map((stk)=>{
                            return (<tr key={stk.id}>
                                    <td>{stk.name}</td>
                                    <td>{stk.price}</td>
                                    <td><input className={stk.name} id={stk.id} type='number'/></td>
                                    
                                </tr>)
                        })
                    }
                    </tbody>
                </table>
            </div> 
            : 
            
            <div>Error while fetching data. Check your connection !   
            Click here to go to <Link className='urlLink' to='/'>Home Page</Link> 
            <br/>
            </div>
        }
    </div>   </div>
    )
}

const connectedStocksBought=connect((state)=>{
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
})(stocksBought);

export default  connectedStocksBought;
