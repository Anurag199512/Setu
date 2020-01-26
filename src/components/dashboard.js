import React from 'react'
import {Header} from './header'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import '../css/dashboard.css'


function Dashboard(props){

    return (<div>
        <Header balance={props.balance}/>
           <div className='dashboard'>
                 <br/><br/>
                {
                    props.stockBought.length>0?
                    (<div>No of Stocks bought by you are {props.stockBought.length}. <br/><br/>
                    <table>
                    <thead>
                        <tr className='rowheader'>
                            <td>Stock Name</td>
                            <td>No of units</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        
                        props.stockBought.map((element)=>{
                                
                                return (<tr key={element.id}>
                                    <td>{element.name}</td>
                                    <td>{element.units}</td>
                                </tr>)
                        })
                    }
                    </tbody>
                    </table>
                   </div>):<div>You haven't bought anything</div>
                }
                 
                <br/>

                <Link className='buysell' to='/buystocks'>Buy More Stocks</Link>
                <br/><br/>
                <Link className='buysell' to='/sellstocks'>Sell your Stocks</Link>

            </div>
        </div>
    )
}

export default connect((state)=>{
    return state
})(Dashboard)

