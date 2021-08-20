import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  const [filmName, setFilmName] = React.useState('');

  function handleChange(evt) {
    setFilmName(evt.target.value);
  }

  function onGetMovies(evt) {
    evt.preventDefault();
    props.onGetMovies(filmName);
  }

  return (
    <section className='search-form'>
      <div className='search-form__wrapper'>
        <form
          className='search-form__form'
          name='search-form'
          onSubmit={onGetMovies}
        >
          <input
            className='search-form__film-name'
            name='filmName'
            type='text'
            placeholder='Фильм'
            required
            onChange={handleChange}
          ></input>
          <button className='search-form__submit' type='submit'></button>
          <FilterCheckbox />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
