import React from 'react';

import styles from 'components/Stations/StationsFilters/StationsFilters.module.css';

import { StationsSortOptionsProps } from './StationsSortOptions.types';

const sortOptions = ['reliability', 'popularity'];

const StationsSortOptions = ({
  sortOptionSelected,
  setSortOptionSelected,
}: StationsSortOptionsProps) => {
  const handleSortOptionClick = (sortOption: string) => {
    if (sortOption === sortOptionSelected) {
      setSortOptionSelected(null);
    } else {
      setSortOptionSelected(sortOption);
    }
  };

  return (
    <>
      <h3>Sort By</h3>
      <ul className={styles.optionsList}>
        {sortOptions.map((sortOption: string) => {
          const isSortOptionSelected = sortOptionSelected === sortOption;
          const genreButtonClasses = `${styles.genreButton} ${isSortOptionSelected ? styles.selected : ''}`;
          return (
            <li key={sortOption}>
              <button
                className={genreButtonClasses}
                onClick={() => handleSortOptionClick(sortOption)}
                data-testid={`sortBy-${sortOption}-button`}
              >
                {sortOption}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default StationsSortOptions;
