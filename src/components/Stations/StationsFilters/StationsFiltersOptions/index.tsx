import React from 'react';

import styles from 'components/Stations/StationsFilters/StationsFilters.module.css';
import { StationsFiltersOptionsProps } from './StationsFiltersOptions.types';

const StationsFiltersOptions = ({
  uniqGenres,
  genresSelected,
  setGenresSelected,
}: StationsFiltersOptionsProps) => {
  const handleGenreClick = (genre: string) => {
    const genresSelectedNew = [...genresSelected];
    const genreIndex = genresSelectedNew.indexOf(genre);
    if (genreIndex === -1) {
      genresSelectedNew.push(genre);
    } else {
      genresSelectedNew.splice(genreIndex, 1);
    }
    setGenresSelected(genresSelectedNew);
  };

  return (
    <>
      <h3>Genres</h3>
      <ul className={styles.optionsList}>
        {uniqGenres.map((genre: string) => {
          const isGenreSelected = genresSelected.includes(genre);
          const genreButtonClasses = `${styles.genreButton} ${isGenreSelected ? styles.selected : ''}`;
          return (
            <li key={genre}>
              <button
                className={genreButtonClasses}
                onClick={() => handleGenreClick(genre)}
                data-testid={`${genre}-genre-button`}
              >
                {genre}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default StationsFiltersOptions;
