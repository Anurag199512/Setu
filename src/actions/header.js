
import React from 'react'
import {Link} from 'react-router-dom'

export function Header(props){
    return(

        <div>
            <Link className='header_title' to='/'>
                SetU
            </Link>

            <span className='header'>
                    Balance: {props.balance}
            </span>
        </div>
    )
}