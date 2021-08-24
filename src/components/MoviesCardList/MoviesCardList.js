import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  return (
    <section className='movies-card-list'>
      <div className='movies-card-list__wrapper'>
        {props.cardList.map((card, i) => {
          return (
            <MoviesCard
              key={i}
              filmSrc={card.filmSrc}
              filmName={card.filmName}
              filmTime={card.filmTime}
              saved={card.saved}
              allowDelete={card.allowDelete}
            />
          );
        })}
      </div>
    </section>
  );
}

export default MoviesCardList;
