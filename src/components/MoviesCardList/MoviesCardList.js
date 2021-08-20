import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const server = ' https://api.nomoreparties.co';

  return (
    <section className='movies-card-list'>
      <div className='movies-card-list__wrapper'>
        {props.renderMovies.map((movie, i) => {
          return (
            <MoviesCard
              key={movie.id}
              filmSrc={server + movie.image.url}
              filmName={movie.nameRU}
              filmTime={movie.duration}
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
