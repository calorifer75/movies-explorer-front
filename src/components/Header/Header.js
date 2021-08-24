import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logoImg from '../../images/logo.svg';
import Menu from '../Menu/Menu';
import Navigation from '../Navigation/Navigation';

function Header(props) {
  const registerLinkHidden = props.registerLinkHidden ? 'hidden' : '';
  const loginLinkHidden = props.loginLinkHidden ? 'hidden' : '';
  const menuBtnHidden = props.menuBtnHidden ? 'hidden' : '';

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
            className={`header__register-link ${registerLinkHidden}`}
          >
            Регистрация
          </Link>

          <Link
            className={`header__login-link ${loginLinkHidden}`}
            to='/signin'
          >
            Войти
          </Link>

          <button
            className={`header__menu-btn ${menuBtnHidden}`}
            type='button'
            onClick={handleMenuOpenClick}
          ></button>

          <nav className='header__nav'>
            <Navigation navigationHidden={props.navigationHidden} />
          </nav>
        </div>
      </div>
      <Menu isOpen={isMenuOpen} onMenuCloseClick={handleMenuCloseClick} />
    </header>
  );
}

export default Header;
