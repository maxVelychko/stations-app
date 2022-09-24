import {
  SetGenresSelected,
  SetSortOptionSelected,
  SortOptionSelected,
} from 'components/Stations/Stations.types';

export interface StationsFiltersProps {
  uniqGenres: string[],
  genresSelected: string[],
  setGenresSelected: SetGenresSelected;
  sortOptionSelected: SortOptionSelected;
  setSortOptionSelected: SetSortOptionSelected;
};
