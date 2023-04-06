import { NavLink } from 'react-router-dom'

import './Navbar.scss'

const Navbar = () => {
  return (
    <div className='navbar'>
        <NavLink className="navbar-dashboard" exact='true' to='/'>All Prices</NavLink>
        <NavLink className="navbar-wallet" exact='true' to='/wallet'>My Wallet</NavLink>
    </div>
  )
}

export default Navbar