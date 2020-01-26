import React from 'react';
import '../css/dashboard.css';
import {selectedStock} from './utils';
import {buyStock} from './utils';
import '../css/button.css';

export  class Liststock extends React.Component{
    constructor(props){
        super(props)
        let  exp={}
        exp=selectedStock()
        var data=[]
        if(!exp.error)
            data=exp.getBody()
      
        this.state={
            stocks:(!exp.error)?JSON.parse(data):{}
        }
    }

    tick() {
        
        let  exp={}
        exp=selectedStock()
        var data=[]
        if(!exp.error)
            data=exp.getBody()

        this.setState(prevState => ({
            stocks:((!exp.error)&& data.length >0 && data!== undefined)?JSON.parse(data):prevState.stocks
        }));
      }

      componentWillUnmount() {
        clearInterval(this.interval);
      }  

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
      }

    claimStock(e){
        e.preventDefault();
        
        for(let i=0;i<e.target.elements.length;++i)
        {
            const id=e.target.elements[i].id;
            const units=e.target.elements[i].value;
            const stockName=e.target.elements[i].className;
            
              if(units.length>0)
                  buyStock(id,units,stockName)
            
        }
    }

    render(){
    return(
        
        <div>
            <div id='buyingFailed'></div>
            Enter stock units to buy.Empty fields will be treated as 0 units.<br/><br/>
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
                    this.state.stocks.data?  this.state.stocks.data.map((stk)=>{
                     
                        return (<tr key={stk.id}>

                                <td>{stk.name}</td>
                                <td>{stk.price}</td>
                                <td><input className={stk.name} id={stk.id} type='number'/></td>
                                
                            </tr>)
                    }): undefined
                }
                </tbody>
                </table>
            <br/><br/>    
            <button className='buyButton' type='submit'>Buy Stocks</button>  
            </form> 

        </div>
        
        )
}
}