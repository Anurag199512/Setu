import React from 'react';
import {sellStock,selectedStock,updatedPrice} from './utils';
import '../css/priceColor.css'

export class CurrentStockPrice extends React.Component{
    constructor(props){
        super(props)
        let  exp={}
        exp=selectedStock()
        var data=[]
        if(!exp.error)
            data=exp.getBody()
      
        this.state={
            allStock:(!exp.error)?JSON.parse(data):{},
            stockPrice:Array(((!exp.error)?JSON.parse(data):{}).length).fill(0),
            flag:Array(((!exp.error)?JSON.parse(data):{}).length).fill(undefined)
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

    comparePrice(prevState,exp,data,newPrice){
            let flag=[];
            if(newPrice){
                newPrice.map((stk,i)=>{
                    flag.push((stk!==prevState.stockPrice[i] &&  prevState.stockPrice[i])?stk>prevState.stockPrice[i]?true:false:undefined)
                })
            }

            return ({
                allStock:((!exp.error)&& data.length >0 && data!== undefined)?JSON.parse(data):prevState.allStock,
                stockPrice:newPrice?newPrice:prevState.stockPrice,
                flag:flag
            })
    }


    tick() {
        let  exp={};
        exp=selectedStock();
        let data;
        if(!exp.error)
            data=exp.getBody()
        
        const newPrice=updatedPrice(data)
        this.setState(prevState=>(this.comparePrice(prevState,exp,data,newPrice)));
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
                            <td>Click to Sell 1 unit</td>
                            
                        </tr>
                        <tr><td><br/></td></tr>
                        </thead>
                        <tbody>
                        {   
                            this.state.allStock.data?
                                this.state.allStock.data.map((stk,i)=>{
                               
                                    return (<tr key={stk.id} className={this.state.flag[i]!== undefined ?this.state.flag[i]?'priceUp':'priceDown':'samePrice'}>
                                            <td>{stk.name}</td>
                                            <td>{stk.price}<span>&nbsp;</span>{this.state.flag[i]!== undefined ?this.state.flag[i]?(<span>&#8593;</span>) :(<span>&#8595;</span>):undefined}</td>
                                            <td><button style={{backgroundColor:"yellowgreen",margin:"0px",borderColor: "white", fontSize: "16px", padding: "4px", border :"8px"}} onClick={this.sellThisStock} className={stk.name} id={stk.id} type='button'>Sell Stock</button></td>
                                        </tr>)
                                }):undefined
                        }
                        </tbody>
                    </table>
        </div>)
    }
}
