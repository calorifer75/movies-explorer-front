import { Link } from 'react-router-dom';
import logoImg from '../../images/logo.svg';

function Register() {
  return (
    <main className='login'>
      <div className='login__wrapper'>
        <Link className='login__logo' to='/'>
          <img src={logoImg} alt='Логотип'></img>
        </Link>
        <h1 className='login__title'>Добро пожаловать!</h1>
        <form className='login__form' name='registerForm' autoComplete='off'>
          <div style={{ width: 'inherit', backgroundColor: 'inherit' }}>
            <div className='login__form-line'>
              <label className='login__label' htmlFor='userName'>
                Имя
              </label>
              <input
                className='login__input'
                type='text'
                name='userName'
                id='userName'
                placeholder='Имя'
                required
              ></input>
            </div>
            <div className='login__form-line'>
              <label className='login__label' htmlFor='userEmail'>
                E-mail
              </label>
              <input
                className='login__input'
                type='email'
                name='userEmail'
                id='userEmail'
                placeholder='E-Mail'
                required
              ></input>
            </div>
            <div className='login__form-line'>
              <label className='login__label' htmlFor='userPassword'>
                Пароль
              </label>
              <input
                className='login__input error_color'
                type='password'
                name='userPassword'
                id='userPassword'
                placeholder='Пароль'
                required
              ></input>
              <p className='error'>Что-то пошло не так...</p>
            </div>
          </div>
          <button className='login__submit' type='submit'>
            Зарегистрироваться
          </button>
        </form>
        <footer className='login__footer'>
          <span>Уже зарегистрированы?</span>
          <Link to='/signin'>Войти</Link>
        </footer>
      </div>
    </main>
  );
}

export default Register;
