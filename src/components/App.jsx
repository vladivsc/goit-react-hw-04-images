import SearchImages from './SearchImages';

import styles from '../components/app.module.scss';

export const App = () => {
  return (
    <div className={styles.app}>
      <SearchImages />
    </div>
  );
};
