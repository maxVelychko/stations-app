import React from 'react';

import StationsFilters from './StationsFilters';
import StationsList from './StationsList';
import { useStations } from './hooks/useStations';
import styles from './Stations.module.css';

const Stations = () => {
  const {
    isLoading,
    isError,
    stations,
    uniqGenres,
    genresSelected,
    setGenresSelected,
    sortOptionSelected,
    setSortOptionSelected,
  } = useStations();

  if (isLoading) {
    return (
      <div data-testid="loading-text">Loading ...</div>
    );
  }

  if (isError) {
    return (
      <div data-testid="error-text">Something went wrong. Please try again later.</div>
    );
  }

  if (!stations) {
    return (
      <div data-testid="no-stations-text">No stations are available at the moment. Please revisit this page later.</div>
    );
  }

  return (
    <div className={styles.stations} data-testid="stations">
      <StationsFilters
        uniqGenres={uniqGenres}
        genresSelected={genresSelected}
        setGenresSelected={setGenresSelected}
        sortOptionSelected={sortOptionSelected}
        setSortOptionSelected={setSortOptionSelected}
      />
      <StationsList stations={stations} />
    </div>
  );
}

export default Stations;
