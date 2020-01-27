import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {selectedStock,sellStock} from './utils';
import {Header} from './header';
import '../css/stocksPage.css';
import {CurrentStockPrice} from './StocksPrice.js'
 


function stocksBought(props){
 
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
            { props.stock.length>0?
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
           
                    return (<tr key={stk.id}>

                            <td>{stk.name}</td>
                            <td>{stk.units}</td>
                            
                        </tr>)
                })
            }
            </tbody>
            </table>:<div>You dont have any stock</div>
        }
           
        <CurrentStockPrice allStock={props.allStock}/>

        </div> 
            :(<div>Error while fetching data.Server error occurred!   
            Click here to go to <Link className='urlLink' to='/'>Home Page</Link> 
            <br/> </div>)
        }
    </div>  

</div>
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
