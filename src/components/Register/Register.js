import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../images/logo.svg';
import ServerErrorMsg from '../ServerErrorMsg/ServerErrorMsg';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/Validator';

function Register(props) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const { setServerErrorMsg } = React.useContext(CurrentUserContext);

  const [inputDisabled, setInputDisabled] = React.useState(false);

  React.useEffect(() => {
    setServerErrorMsg('');
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onRegister(evt) {
    evt.preventDefault();
    setInputDisabled(true);
    props.onRegister(
      values.userEmail,
      values.userPassword,
      values.userName,
      setInputDisabled
    );
  }

  return (
    <main className='login'>
      <div className='login__wrapper'>
        <Link className='login__logo' to='/'>
          <img src={logoImg} alt='Логотип'></img>
        </Link>
        <h1 className='login__title'>Добро пожаловать!</h1>
        <form
          className='login__form'
          name='registerForm'
          autoComplete='off'
          onSubmit={onRegister}
        >
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
                disabled={inputDisabled}
                pattern='^[А-Яа-яЁёA-Za-z\s-]+$'
                onChange={handleChange}
              ></input>
              <span className='error'>{errors.userName}</span>
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
                disabled={inputDisabled}
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
          </div>
          <ServerErrorMsg />
          <button
            className={`login__submit ${
              isValid ? '' : 'login__submit_disabled'
            }`}
            type='submit'
            disabled={!isValid || inputDisabled}
          >
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
