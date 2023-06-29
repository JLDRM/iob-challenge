import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../config/redux/hooks';
import { logOutUser, selectUsers } from '../../resources/users/users.slice';
import './Header.css';
import logo from './logo.svg';

const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { loggedUser } = useAppSelector(selectUsers);

  return (
    <header className="Header">
      <Link to='/'>
        <img src={logo} className="Header-logo" alt="logo" />
      </Link>

      <div className="Header-routes">
        {!loggedUser && <Link to='/login'>
          <p>Log in</p>
        </Link>}

        {!loggedUser &&
          <Link to='/signin'>
            <p>Sign in</p>
          </Link>
        }

        {loggedUser && <p className='Header-link' onClick={() => dispatch(logOutUser())}>Log out</p>}
      </div >

    </header >
  );
};

export default Header;