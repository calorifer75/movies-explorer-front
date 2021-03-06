import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
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
              id={movie.id}
              _id={movie._id}
              filmSrc={movie.image.url}
              filmName={movie.nameRU}
              filmTime={movie.duration}
              filmTrailer={movie.trailerLink}
              filmSaved={movie.saved}
              allowDelete={movie.allowDelete}
              hidden={movie.hidden}
              onLikeButtonClick={props.onLikeButtonClick}
            />
          );
        })}
      </div>
    </section>
  );
}

export default MoviesCardList;
