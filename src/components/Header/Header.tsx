import { Link } from 'react-router-dom';
import './Header.css';
import logo from './logo.svg';

const Header = (): JSX.Element => {
  return (
    <header className="Header">
      <Link to='/'>
        <img src={logo} className="Header-logo" alt="logo" />
      </Link>

      <Link to='/signin'>
        <p>Sign in</p>
      </Link>
    </header>
  );
};

export default Header;