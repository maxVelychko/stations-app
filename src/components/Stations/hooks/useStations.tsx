import { useState, useMemo } from 'react';

import { useFetchData } from 'hooks/useFetchData';
import { StationData } from 'types/Stations';
import { UseStationsReturnType } from 'components/Stations/Stations.types';

export const useStations = (): UseStationsReturnType => {
  const [genresSelected, setGenresSelected] = useState<string[]>([]);
  const [sortOptionSelected, setSortOptionSelected] = useState<null | string>(null);
  const {
    data,
    isLoading,
    isError,
  } = useFetchData('https://s3-us-west-1.amazonaws.com/cdn-web.tunein.com/stations.json');
  const stationsData = data ? data.data : data;

  // Note: There is no API to get the list of uniq genres, so we compute them from the received stations data.
  const uniqGenres = useMemo(
    () => {
      const genres: string[] = [];
      if (stationsData) {
        stationsData.forEach((station: StationData) => {
          station.tags.forEach(tag => {
            if (!genres.includes(tag)) genres.push(tag);
          });
        });
      }
      return genres;
    },
    [stationsData]
  );

  const stationsFiltered = useMemo(
    () => {
      if (genresSelected.length) {
        return stationsData.filter((stationItem: StationData) => {
          for (let i = 0; i < stationItem.tags.length; i++) {
            if (genresSelected.includes(stationItem.tags[i])) {
              return true;
            }
          }
          return false;
        });
      }
      return stationsData;
    },
    [stationsData, genresSelected]
  );

  const stationsSorted = useMemo(
    () => {
      if (sortOptionSelected) {
        const stationsFilteredClone = [...stationsFiltered];
        return stationsFilteredClone.sort(
          (a: StationData, b: StationData) => {
            const valueA = Number(a[sortOptionSelected as keyof StationData]);
            const valueB = Number(b[sortOptionSelected as keyof StationData]);
            return valueA - valueB;
          }
        );
      }
      return stationsFiltered;
    },
    [stationsFiltered, sortOptionSelected]
  );

  return {
    isLoading,
    isError,
    stations: stationsSorted,
    uniqGenres,
    genresSelected,
    setGenresSelected,
    sortOptionSelected,
    setSortOptionSelected,
  };
};
