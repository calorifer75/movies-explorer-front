import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../images/logo.svg';

function Login(props) {
  const [values, setValues] = React.useState({});

  // Управление инпутами
  function handleChange(evt) {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  }

  function onLogin(evt) {
    evt.preventDefault();
    props.onLogin(values.userEmail, values.userPassword);
  }

  return (
    <main className='login'>
      <div className='login__wrapper'>
        <Link to='/'>
          <img className='login__logo' src={logoImg} alt='Логотип'></img>
        </Link>
        <h1 className='login__title'>Рады видеть!</h1>
        <form
          className='login__form'
          name='loginForm'
          autoComplete='off'
          onSubmit={onLogin}
        >
          <div style={{ width: 'inherit' }}>
            <div className='login__form-line'>
              <label className='login__label' htmlFor='userEmail'>
                E-mail
              </label>
              <input
                className='login__input'
                type='email'
                name='userEmail'
                id='userEmail'
                required
                placeholder='E-Mail'
                onChange={handleChange}
              ></input>
            </div>
            <div className='login__form-line'>
              <label className='login__label' htmlFor='userPassword'>
                Пароль
              </label>
              <input
                className='login__input'
                type='password'
                name='userPassword'
                id='userPassword'
                placeholder='Пароль'
                required
                onChange={handleChange}
              ></input>
            </div>
            <div className='login__divider'></div>
          </div>
          <button className='login__submit' type='submit'>
            Войти
          </button>
        </form>
        <footer className='login__footer'>
          <span>Еще не зарегистрированы?</span>
          <Link to='/signup'>Регистрация</Link>
        </footer>
      </div>
    </main>
  );
}

export default Login;
