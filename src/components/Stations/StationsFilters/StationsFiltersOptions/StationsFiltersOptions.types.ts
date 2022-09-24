import { SetGenresSelected } from 'components/Stations/Stations.types';

export interface StationsFiltersOptionsProps {
  uniqGenres: string[],
  genresSelected: string[],
  setGenresSelected: SetGenresSelected;
};
