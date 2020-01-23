import React from 'react'
import {Header} from './header'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import '../css/dashboard.css'

function Dashboard(props){
    //console.log(props)

    return (<div>
        <Header balance={props.balance}/>
           <div className='dashboard'>
                Dashboard<br/>
                {props.stockBought.length>0?<div>Stock bought by you</div>:<div>You haven't bought anything</div>} 
                <br/>

                <Link className='buysell' to='buy_sell'>Buy More Stock</Link>

            </div>
        </div>
    )
}

export default connect((state)=>{
    return state
})(Dashboard)

