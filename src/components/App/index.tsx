import React from 'react';

import Stations from 'components/Stations';

import styles from './App.module.css';

const App = () => {
  return (
    <>
      <header className={styles.header}>
        <h3>The Stations App</h3>
      </header>
      <main className={styles.mainContent}>
        <Stations />
      </main>
    </>
  );
}

export default App;
