import { useState , memo } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

import initialState from 'components/initialState';
import styles from '../Searchbar/searchbar.module.scss';

const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState({ ...initialState });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (state.search.trim().toLowerCase() === '') {
      return Notiflix.Notify.failure('Enter correct search!');
    }
    onSubmit({ ...state });
    setState({ ...initialState });
  };

  const { search } = state;

  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.searchFormButton}>
          <span className={styles.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={styles.searchFormInput}
          onChange={handleChange}
          name="search"
          value={search}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};


export default memo(Searchbar);

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
}