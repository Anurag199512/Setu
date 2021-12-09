import { Link } from 'react-router-dom';

export default function Header(props) {
    return (
        <div className='pageHeader'>
            <Link className='header_title' to='/'>
                Setu
            </Link>

            <span className='header'>
                    Balance: {props.balance}
            </span>
        </div>
    );
}
