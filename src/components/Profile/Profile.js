import './Profile.css';
import Header from '../Header/Header';

function Profile(props) {
  return (
    <>
      <Header
        registerLinkHidden={true}
        loginLinkHidden={true}
      />
      <main className='profile'>
        <div className='profile__wrapper'>
          <h1 className='profile__title'>Привет, Вячеслав!</h1>
          <form className='profile__form' name='profileForm' autoComplete='off'>
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
                  placeholder='Имя'
                  required
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
                  placeholder='E-mail'
                  required
                ></input>
              </div>
            </div>
            <button className='profile__submit' type='submit'>
              Редактировать
            </button>
          </form>
          <button className='profile__exit' type='button'>
            Выйти из аккаунта
          </button>
        </div>
      </main>
    </>
  );
}

export default Profile;
