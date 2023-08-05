import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function NavBar({ icon, title }) {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className={icon} />{title}
      </h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  )
}
// specify validations for the props
NavBar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
}

// set default values for props
NavBar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt'
}

export default NavBar;