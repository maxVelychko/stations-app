import { StationData } from 'types/Stations';

export type SetGenresSelected = (genres: string[]) => void;
export type SetSortOptionSelected = (sortOption: null | string) => void;
export type SortOptionSelected = null | string;
export type Stations = null | StationData[];

export interface UseStationsReturnType {
  isLoading: boolean;
  isError: boolean;
  stations: Stations;
  uniqGenres: string[];
  genresSelected: string[];
  setGenresSelected: SetGenresSelected
  sortOptionSelected: SortOptionSelected;
  setSortOptionSelected: SetSortOptionSelected;
};

export interface GetUseStationsHookResultMockedProps {
  isLoading?: boolean;
  isError?: boolean;
  stations?: Stations
  genresSelected?: string[];
  uniqGenres?: string[];
};
