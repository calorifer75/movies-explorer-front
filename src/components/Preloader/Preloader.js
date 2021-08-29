import React from 'react';
import ServerErrorMsg from '../ServerErrorMsg/ServerErrorMsg';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Preloader.css';

const Preloader = (props) => {
  const preloaderActive = props.preloaderActive;
  const preloaderNotFound = props.preloaderNotFound;
  const { serverErrorMsg, setServerErrorMsg } = React.useContext(CurrentUserContext);

  React.useEffect(() => {    
    setServerErrorMsg('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='preloader'>
      {serverErrorMsg ? <ServerErrorMsg centered={true}/> : ''}
      
      <p
        className={`preloader__not-found ${
          preloaderNotFound ? 'preloader__not-found_active' : ''
        }`}
      >
        Ничего не найдено
      </p>
      <div
        className={`preloader__container ${
          preloaderActive ? 'preloader__container_active' : ''
        }`}
      >
        <span className='preloader__round'></span>
      </div>
    </div>
  );
};

export default Preloader;
