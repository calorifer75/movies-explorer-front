import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logoImg from '../../images/logo.svg';
import Menu from '../Menu/Menu';
import Navigation from '../Navigation/Navigation';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Header(props) {
  const { loggedIn } = React.useContext(CurrentUserContext);

  // Состояние окна навигации
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Нажатие на кнопку меню в Header открывает Menu
  function handleMenuOpenClick() {
    setIsMenuOpen(true);
  }

  // Нажатие на кнопку закрытия в Menu закрывает Menu
  function handleMenuCloseClick() {
    setIsMenuOpen(false);
  }

  return (
    <header className='header'>
      <div className='header__wrapper'>
        <Link to='/'>
          <img className='header__logo' src={logoImg} alt='Логотип'></img>
        </Link>
        <div className='header__right-side'>
          <Link
            to='/signup'
            className={`header__register-link ${loggedIn ? 'hidden' : ''}`}            
          >
            Регистрация
          </Link>

          <Link
            className={`header__login-link ${loggedIn ? 'hidden' : ''}`}
            to='/signin'
          >
            Войти
          </Link>

          <button
            className={`header__menu-btn ${loggedIn ? '' : 'hidden'}`}
            type='button'
            onClick={handleMenuOpenClick}
          ></button>

          <nav className={`header__nav ${loggedIn ? '' : 'hidden'}`}>
            <Navigation />
          </nav>
        </div>
      </div>
      <Menu isOpen={isMenuOpen} onMenuCloseClick={handleMenuCloseClick} />
    </header>
  );
}

export default Header;
