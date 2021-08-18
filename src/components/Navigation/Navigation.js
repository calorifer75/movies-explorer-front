import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation(props) {
  const navigationHidden = props.navigationHidden ? 'hidden' : '';

  return (
    <ul className={`navigation ${navigationHidden}`}>
      <div className='navigation__wrapper'>
        <li className='navigation__item'>
          <Link
            className='navigation__link navigation__link_to-main'
            to='/'
            onClick={props.onMenuCloseClick}
          >
            Главная
          </Link>
        </li>
        <li className='navigation__item'>
          <Link
            className='navigation__link'
            to='/movies'
            onClick={props.onMenuCloseClick}
          >
            Фильмы
          </Link>
        </li>
        <li className='navigation__item'>
          <Link
            className='navigation__link'
            to='/saved-movies'
            onClick={props.onMenuCloseClick}
          >
            Сохраненные фильмы
          </Link>
        </li>
      </div>
      <li className='navigation__item navigation__item_profile'>
        <Link
          className='navigation__link navigation__link_profile'
          to='/profile'
          onClick={props.onMenuCloseClick}
        >
          Аккаунт
        </Link>
      </li>
    </ul>
  );
}

export default Navigation;
