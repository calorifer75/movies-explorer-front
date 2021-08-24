import { useHistory } from 'react-router';
import './NotFound.css';

function NotFound() {
  const history = useHistory();

  return (
    <main className='not-found'>
      <div className='not-found__wrapper'>
        <h1 className='not-found__title'>404</h1>
        <p className='not-found__paragraph'>Страница не найдена</p>
      </div>
      <footer className='not-found__footer'>
        <button onClick={history.goBack} type='button'>
          Назад
        </button>
      </footer>
    </main>
  );
}

export default NotFound;
