import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox(props) {
  function onChange(evt) {
    props.onChange(evt.target.checked);
  }

  return (
    <label className='filter-checkbox'>
      <input
        id='short-meters'
        type='checkbox'
        defaultChecked={props.filmShort}
        onChange={onChange}
      />
      <span className='filter-checkbox__box-green'>
        <span className='filter-checkbox__box-white'></span>
      </span>
      Короткометражки
    </label>
  );
}

export default FilterCheckbox;
