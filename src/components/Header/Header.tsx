import { Link } from 'react-router-dom';
import './Header.css';
import logo from './logo.svg';

const Header = (): JSX.Element => {
  return (
    <header className="Header">
      <Link to='/'>
        <img src={logo} className="Header-logo" alt="logo" />
      </Link>

      <div className="Header-routes">
        <Link to='/login'>
          <p>Log in</p>
        </Link>

        <Link to='/signin'>
          <p>Sign in</p>
        </Link>
      </div>

    </header>
  );
};

export default Header;