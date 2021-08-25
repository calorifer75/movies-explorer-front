import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../images/logo.svg';
import ServerErrorMsg from '../ServerErrorMsg/ServerErrorMsg';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/Validator';

function Login(props) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const { setServerErrorMsg } = React.useContext(CurrentUserContext);

  const [inputDisabled, setInputDisabled] = React.useState(false);

  React.useEffect(() => {
    setServerErrorMsg('');
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onLogin(evt) {
    evt.preventDefault();
    setInputDisabled(true);
    props.onLogin(values.userEmail, values.userPassword, setInputDisabled);
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
                disabled={inputDisabled}
                placeholder='E-Mail'
                onChange={handleChange}
              ></input>
              <span className='error'>{errors.userEmail}</span>
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
                disabled={inputDisabled}
                minLength='8'
                onChange={handleChange}
              ></input>
              <span className='error'>{errors.userPassword}</span>
            </div>
            <div className='login__divider'></div>
          </div>
          <div style={{ width: 'inherit' }}>
            <ServerErrorMsg />
            <button
              className={`login__submit ${
                isValid ? '' : 'login__submit_disabled'
              }`}
              type='submit'
              disabled={!isValid || inputDisabled}
            >
              Войти
            </button>
          </div>
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
