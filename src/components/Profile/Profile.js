import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ServerErrorMsg from '../ServerErrorMsg/ServerErrorMsg';

function Profile(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  // Получение инфы о пользователе из контекста
  const { currentUser, setServerErrorMsg } =
    React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setServerErrorMsg('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Синхронизация локального стейта с CurrentUser
  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  // Изменение инпутов
  function handleChange(evt) {
    switch (evt.target.name) {
      case 'userName':
        setName(evt.target.value);
        break;
      case 'userEmail':
        setEmail(evt.target.value);
        break;
      default:
        break;
    }
  }

  function onUpdateProfile(evt) {
    evt.preventDefault();
    props.onUpdateProfile(name, email);
  }

  return (
    <>
      <Header />
      <main className='profile'>
        <div className='profile__wrapper'>
          <h1 className='profile__title'>Привет, Вячеслав!</h1>
          <form
            className='profile__form'
            name='profileForm'
            autoComplete='off'
            onSubmit={onUpdateProfile}
          >
            <div style={{ width: 'inherit' }}>
              <div className='profile__form-line'>
                <label className='profile__label' htmlFor='userName'>
                  Имя
                </label>
                <input
                  className='profile__input'
                  type='text'
                  name='userName'
                  id='userName'
                  value={name || ''}
                  placeholder='Имя'
                  required
                  onChange={handleChange}
                ></input>
              </div>
              <div className='profile__form-line profile__form-line_bottom'>
                <label className='profile__label' htmlFor='userEmail'>
                  E-mail
                </label>
                <input
                  className='profile__input'
                  type='email'
                  name='userEmail'
                  id='userEmail'
                  value={email || ''}
                  placeholder='E-mail'
                  required
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div
              style={{
                display: 'inherit',
                flexDirection: 'inherit',
                alignItems: 'inherit',
              }}
            >
              <ServerErrorMsg centered={true}/>
              <button className='profile__submit' type='submit'>
                Редактировать
              </button>
            </div>
          </form>
          <button
            className='profile__exit'
            type='button'
            onClick={props.onExit}
          >
            Выйти из аккаунта
          </button>
        </div>
      </main>
    </>
  );
}

export default Profile;
