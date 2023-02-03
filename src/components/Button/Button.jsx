import PropTypes from 'prop-types';

import styles from '../Button/button.module.scss'

const Button = ({ onLoadMore, text }) => {
  return (
    <button
      onClick={onLoadMore}
      type="button"
      className={styles.buttonLoadMore}
    >
      {text}
    </button>
  );
};

export default Button;

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}