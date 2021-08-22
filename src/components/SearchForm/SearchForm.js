import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  const [values, setValues] = React.useState({});

  function handleChange(evt) {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  }

  function handleCheckBox(checked) {
    setValues({ ...values, filmShort: checked });
  }

  function onGetMovies(evt) {
    evt.preventDefault();
    props.onGetMovies(
      values.filmName,
      values.filmShort ? values.filmShort : false
    );
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
          <FilterCheckbox onChange={handleCheckBox} />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
