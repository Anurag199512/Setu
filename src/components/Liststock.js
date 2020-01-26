import React from 'react';
import '../css/dashboard.css';
import {buyStock} from './utils';

export  class Liststock extends React.Component{
    claimStock(e){
        e.preventDefault();
        console.log(e.target.elements)

        for(let i=0;i<e.target.elements.length;++i)
        {
            const id=e.target.elements[i].id;
            const units=e.target.elements[i].value;
            const stockName=e.target.elements[i].className;

            //console.log(id,units,stockName)
            
              if(units.length>0)
                  buyStock(id,units,stockName)
            
        }
            //console.log('hth',e.target.elements[0].value)
        

    }

    render(){
    return(
        
        <div>
            <div id='buyingFailed'></div>
            Available Stock details<br/><br/>
            <form onSubmit={this.claimStock}>
                <table>
                <thead>
                <tr className='rowheader'>
                    <td>Name</td>
                    <td>Price of 1 stock</td>
                    <td>No of units to buy</td>

                </tr>
                </thead>
                <tbody>
                {
                    this.props.stocks.data.map((stk)=>{
                        //console.log(stk)
                        return (<tr key={stk.id}>

                                <td>{stk.name}</td>
                                <td>{stk.price}</td>
                                <td><input className={stk.name} id={stk.id} type='number'/></td>
                                
                            </tr>)
                    })
                }
                </tbody>
                </table>
            <br/><br/>    
            <button type='submit'>Buy these</button>  
            </form> 

        </div>
        
        )
}
}