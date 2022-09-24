import React from 'react';

import StationsFiltersOptions from './StationsFiltersOptions';
import StationsSortOptions from './StationsSortOptions';
import styles from './StationsFilters.module.css';
import { StationsFiltersProps } from './StationsFilters.types';

const StationsFilters = ({
  uniqGenres,
  genresSelected,
  setGenresSelected,
  sortOptionSelected,
  setSortOptionSelected,
}: StationsFiltersProps) => {
  const handleClearFiltersClick = () => {
    setGenresSelected([]);
    setSortOptionSelected(null);
  };

  const hasAnyFilterSelected = genresSelected.length > 0 || sortOptionSelected;
  const clearFiltersClasses = `${styles.clearFilters} ${hasAnyFilterSelected ? '' : styles.disabled}`;

  return (
    <>
      <button
        className={clearFiltersClasses}
        onClick={handleClearFiltersClick}
        data-testid="clear-all-button"
      >
        Clear all
      </button>
      <StationsFiltersOptions
        uniqGenres={uniqGenres}
        genresSelected={genresSelected}
        setGenresSelected={setGenresSelected}
      />
      <StationsSortOptions
        sortOptionSelected={sortOptionSelected}
        setSortOptionSelected={setSortOptionSelected}
      />
    </>
  );
}

export default StationsFilters;
