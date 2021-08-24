import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <div className='portfolio__wrapper'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__list'>
          <li className='portfolio__item'>
            <a
              className='portfolio__link'
              href='https://calorifer75.github.io/russian-travel/index.html'
              target='_blank'
              rel='noreferrer'
            >
              Статичный сайт
            </a>
            <span className='portfolio__link'>↗</span>
          </li>
          <li className='portfolio__item'>
            <a
              className='portfolio__link'
              href='https://calorifer75.github.io/mesto/index'
              target='_blank'
              rel='noreferrer'
            >
              Адаптивный сайт
            </a>
            <span className='portfolio__link'>↗</span>
          </li>
          <li className='portfolio__item'>
            <a
              className='portfolio__link'
              href='https://calorifer75.github.io/mesto/index'
              target='_blank'
              rel='noreferrer'
            >
              Одностраничное приложение
            </a>
            <span className='portfolio__link'>↗</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
