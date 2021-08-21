import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  const server = ' https://api.nomoreparties.co';

  return (
    <section className='movies-card-list'>
      <Preloader
        preloaderActive={props.preloaderActive}
        preloaderNotFound={props.preloaderNotFound}
      />
      <div className='movies-card-list__wrapper'>      
        {props.renderMovies.map((movie, i) => {
          return (
            <MoviesCard
              key={movie.id}
              filmSrc={server + movie.image.url}
              filmName={movie.nameRU}
              filmTime={movie.duration}
              filmTrailer={movie.trailerLink}
              saved={false}
              allowDelete={false}
            />
          );
        })}
      </div>
    </section>
  );
}

export default MoviesCardList;
