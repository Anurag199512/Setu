import React from 'react'
import {Link} from 'react-router-dom'
import '../css/dashboard.css'

export function Liststock(props){
     
    return(
     
        <div>
            Available Stock details<br/><br/>
            <form>
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
                    props.stocks.data.map((stk)=>{
                        //console.log(stk)
                        return (<tr key={stk.id}>
                                <td>{stk.name}</td>
                                <td>{stk.price}</td>
                                <td><input type='number'/></td>
                            
                            </tr>)
                    })
                }
                </tbody>
                </table>
            <br/><br/>    
            <Link className='buysell'>Buy these</Link>  
            </form> 
        </div>
        
        )
}