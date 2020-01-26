import React from 'react';
import {sellStock,selectedStock} from './utils';

export class CurrentStockPrice extends React.Component{
    constructor(props){
        super(props)
        let  exp={}
        exp=selectedStock()
        var data=[]
        if(!exp.error)
            data=exp.getBody()
      
        this.state={
            allStock:(!exp.error)?JSON.parse(data):{}
        }
    }
    sellThisStock(e){
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

    tick() {
        
        let  exp={}
        exp=selectedStock()
        var data=[]
        if(!exp.error)
            data=exp.getBody()

        this.setState(prevState => ({
          allStock:((!exp.error)&& data.length >0 && data!== undefined)?JSON.parse(data):prevState.allStock
        }));
      }

      componentWillUnmount() {
        clearInterval(this.interval);
      }  

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
      }

    render(){

        return (
            <div>
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
                             
                                this.state.allStock.data.map((stk)=>{
                                    return (<tr key={stk.id}>
                                            <td>{stk.name}</td>
                                            <td>{stk.price}</td>
                                            <td><button style={{backgroundColor:"yellowgreen",margin:"0px",borderColor: "white", fontSize: "16px", padding: "4px", border :"8px"}} onClick={this.sellThisStock} className={stk.name} id={stk.id} type='button'>Sell Stock</button></td>
                                        </tr>)
                                })
                        }
                        </tbody>
                    </table>
        </div>)
    }
}
