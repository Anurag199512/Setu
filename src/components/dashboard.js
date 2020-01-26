import React from 'react'
import {Header} from './header'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import '../css/dashboard.css'

// function getTotalUnits(unit){
//     let total=0;
//     for(let i=0;i<unit.length;++i){
//         total=total+Number(unit[i])
//     }
//     return total;
// }

function Dashboard(props){
    //console.log(props)

    return (<div>
        <Header balance={props.balance}/>
           <div className='dashboard'>
                Dashboard<br/><br/>
                {
                    props.stockBought.length>0?
                    (<div>No of Stocks bought by you are {props.stockBought.length} 
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

