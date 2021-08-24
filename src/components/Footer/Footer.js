import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__wrapper'>
        <h2 className='footer__title'>
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h2>

        <div className='footer__row'>
          <ul className='footer__list'>
            <li className='footer__item'>
              <a
                className='footer__link'
                href='https://praktikum.yandex.ru/'
                target='_blank'
                rel='noreferrer'
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className='footer__item'>
              <a
                className='footer__link'
                href='https://github.com/calorifer75/'
                target='_blank'
                rel='noreferrer'
              >
                Github
              </a>
            </li>
            <li className='footer__item'>
              <a
                className='footer__link'
                href='https://facebook.com'
                target='_blank'
                rel='noreferrer'
              >
                Facebook
              </a>
            </li>
          </ul>

          <p className='footer__copyright'>©2021</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
