import './MoviesMoreCards.css';

function MoviesMoreCards(props) {
  const hidden = props.displayMoreMovies ? '' : 'hidden';

  return (
    <section className='movies-more-cards'>
      <button
        className={`movies-more-cards__more-button ${hidden}`}
        type='button'
        onClick={props.renderMoreMovies}
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesMoreCards;
