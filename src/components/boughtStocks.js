import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {selectedStock,sellStock} from './utils';
import {Header} from './header';
import '../css/stocksPage.css';

 
function reload() {
    
        document.location.reload();
  }
  
  setTimeout(reload, 25000);

function sellThisStock(e){
    const id=e.target.id;
    const units=1;
    const stockName=e.target.className;

    if(units>0)
        {
            const proceed=prompt(`You are about to sell ${units} units of ${stockName}.Type "yes" or "Y" to confirm`);
         
            if(proceed.toLowerCase()==='yes' ||proceed.toLowerCase()==='y' )
              {  
                sellStock(id,units,stockName)
               
              }
        }
}

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
                    //console.log(stk)
                    return (<tr key={stk.id}>

                            <td>{stk.name}</td>
                            <td>{stk.units}</td>
                            
                        </tr>)
                })
            }
            </tbody>
            </table>:<div>You dont have any stock</div>
        }
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
                                    <td><button onClick={sellThisStock} className={stk.name} id={stk.id} type='button'>Sell Stock</button></td>
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
