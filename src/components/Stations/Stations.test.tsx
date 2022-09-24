import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import * as useFetchDataHooks from 'hooks/useFetchData';
import { StationData } from 'types/Stations';

import * as useStationsHooks from './hooks/useStations';
import { GetUseStationsHookResultMockedProps } from './Stations.types';
import { createStationMock } from './Stations.utils';
import Stations from './index';

describe('Stations', () => {
  describe('The component states', () => {
    let useStationsHooksMock: jest.SpyInstance;
    
    const getUseStationsHookResultMocked = ({
      isLoading = false,
      isError = false,
      stations = null,
      genresSelected = [],
      uniqGenres = [],
    }: GetUseStationsHookResultMockedProps) => ({
      isLoading,
      isError,
      stations,
      genresSelected,
      uniqGenres,
    });

    beforeEach(() => {
      useStationsHooksMock = jest.spyOn(useStationsHooks, 'useStations');
    });

    afterEach(jest.clearAllMocks);

    afterAll(() => {
      useStationsHooksMock.mockRestore();
    })

    test('renders the "loading" state when "isLoading" is set to true', async () => {
      useStationsHooksMock.mockReturnValue(
        getUseStationsHookResultMocked({
          isLoading: true,
        })
      );

      await render(<Stations />);

      expect(screen.getByTestId('loading-text')).toBeInTheDocument();
    });

    test('renders the "error" state when "isError" is set to true', async () => {
      useStationsHooksMock.mockReturnValue(
        getUseStationsHookResultMocked({
          isError: true,
        }
      ));

      await render(<Stations />);

      expect(screen.getByTestId('error-text')).toBeInTheDocument();
    });

    test('renders the "no stations" state when "stations" is falsy value', async () => {
      useStationsHooksMock.mockReturnValue(
        getUseStationsHookResultMocked({
          stations: null,
        })
      );

      await render(<Stations />);

      expect(screen.getByTestId('no-stations-text')).toBeInTheDocument();
    });

    test('renders the stations content when "stations" data is provided', async () => {
      useStationsHooksMock.mockReturnValue(
        getUseStationsHookResultMocked({
          stations: [createStationMock()],
        })
      );

      await render(<Stations />);

      expect(screen.getByTestId('stations')).toBeInTheDocument();
    });
  });

  describe('The user interactions', () => {
    let useFetchDataHooksMock: jest.SpyInstance;

    const getUseFetchDataHookResultMocked = (
      stations: StationData[] = [],
    ) => ({
      isLoading: false,
      isError: false,
      data: { data: stations },
    });

    beforeEach(() => {
      useFetchDataHooksMock = jest.spyOn(useFetchDataHooks, 'useFetchData');
    });

    afterEach(jest.clearAllMocks);

    test('renders the correct list of stations when the user clicks on the same genre filter 1st time to enable it and in 2nd time to disable', async () => {
      const stationWithPopGenreMock = createStationMock({
        tags: ['pop'],
      });
      const stationWithJazzGenreMock = createStationMock({
        tags: ['jazz'],
      });
      useFetchDataHooksMock.mockReturnValue(
        getUseFetchDataHookResultMocked([stationWithPopGenreMock, stationWithJazzGenreMock])
      );

      await render(<Stations />);

      // initial state
      const popGenreOptionElement = screen.getByTestId('pop-genre-button');
      const stationWithPopGenreListItemElement = screen.getByTestId(`station-list-item-${stationWithPopGenreMock.id}`);
      let stationWithJazzGenreListItemElement = screen.getByTestId(`station-list-item-${stationWithJazzGenreMock.id}`);
      expect(popGenreOptionElement).toBeInTheDocument();
      expect(popGenreOptionElement).not.toHaveClass('selected');
      expect(stationWithPopGenreListItemElement).toBeInTheDocument();
      expect(stationWithJazzGenreListItemElement).toBeInTheDocument();

      // 1st time clicks to filter by "pop" genre
      fireEvent.click(popGenreOptionElement);

      expect(popGenreOptionElement).toHaveClass('selected');
      expect(stationWithPopGenreListItemElement).toBeInTheDocument();
      expect(stationWithJazzGenreListItemElement).not.toBeInTheDocument();

      // 2nd time clicks to filter by "pop" genre
      fireEvent.click(popGenreOptionElement);

      stationWithJazzGenreListItemElement = screen.getByTestId(`station-list-item-${stationWithJazzGenreMock.id}`);
      expect(popGenreOptionElement).not.toHaveClass('selected');
      expect(stationWithPopGenreListItemElement).toBeInTheDocument();
      expect(stationWithJazzGenreListItemElement).toBeInTheDocument();
    });

    test('renders the correct list of stations when the user clicks on two genre filters and then on "clear all" button', async () => {
      const stationWithPopGenreMock = createStationMock({
        tags: ['pop'],
      });
      const stationWithJazzGenreMock = createStationMock({
        tags: ['jazz'],
      });
      useFetchDataHooksMock.mockReturnValue(
        getUseFetchDataHookResultMocked([stationWithPopGenreMock, stationWithJazzGenreMock])
      );

      await render(<Stations />);

      const popGenreOptionElement = screen.getByTestId('pop-genre-button');
      const jazzGenreOptionElement = screen.getByTestId('jazz-genre-button');
      const clearAllButtonElement = screen.getByTestId('clear-all-button');
      const stationWithPopGenreListItemElement = screen.getByTestId(`station-list-item-${stationWithPopGenreMock.id}`);
      let stationWithJazzGenreListItemElement = screen.getByTestId(`station-list-item-${stationWithJazzGenreMock.id}`);

      // 1st time clicks to filter by "pop" genre
      fireEvent.click(popGenreOptionElement);
      // 1st time clicks to filter by "jazz" genre
      fireEvent.click(jazzGenreOptionElement);

      stationWithJazzGenreListItemElement = screen.getByTestId(`station-list-item-${stationWithJazzGenreMock.id}`);
      expect(popGenreOptionElement).toHaveClass('selected');
      expect(jazzGenreOptionElement).toHaveClass('selected');
      expect(stationWithPopGenreListItemElement).toBeInTheDocument();
      expect(stationWithJazzGenreListItemElement).toBeInTheDocument();

      // 1st time clicks on "clear all" button
      fireEvent.click(clearAllButtonElement);
      expect(popGenreOptionElement).not.toHaveClass('selected');
      expect(jazzGenreOptionElement).not.toHaveClass('selected');
      expect(stationWithPopGenreListItemElement).toBeInTheDocument();
      expect(stationWithJazzGenreListItemElement).toBeInTheDocument();
    });

    test('renders the correct order of the stations when the user clicks to sort by "popularity" and then on "clear all" button', async () => {
      const popularitySortOption = 'popularity';
      const stationWithSmallestPopularityMock = createStationMock({
        popularity: 1,
      });
      const stationWithMediumPopularityMock = createStationMock({
        popularity: 5,
      });
      const stationWithHighestPopularityMock = createStationMock({
        popularity: 9,
      });
      useFetchDataHooksMock.mockReturnValue(
        getUseFetchDataHookResultMocked([stationWithHighestPopularityMock, stationWithSmallestPopularityMock, stationWithMediumPopularityMock])
      );

      await render(<Stations />);

      const popularitySortOptionElement = screen.getByTestId(`sortBy-${popularitySortOption}-button`);
      const stationWithSmallestPopularityTestId = `station-list-item-${stationWithSmallestPopularityMock.id}`;
      const stationWithMediumPopularityTestId = `station-list-item-${stationWithMediumPopularityMock.id}`;
      const stationWithHighestPopularityTestId = `station-list-item-${stationWithHighestPopularityMock.id}`;
      const clearAllButtonElement = screen.getByTestId('clear-all-button');
      let listItemsElements = screen.getAllByTitle('list-item');

      const expectTheInitialOrder = () => {
        expect(listItemsElements[0]).toHaveAttribute(
          'data-testid',
          stationWithHighestPopularityTestId,
        );
        expect(listItemsElements[1]).toHaveAttribute(
          'data-testid',
          stationWithSmallestPopularityTestId,
        );
        expect(listItemsElements[2]).toHaveAttribute(
          'data-testid',
          stationWithMediumPopularityTestId,
        );
      };
      
      // initial order
      expectTheInitialOrder();

      // 1st time clicks to sort by "popularity"
      fireEvent.click(popularitySortOptionElement);

      expect(popularitySortOptionElement).toHaveClass('selected');
      // new order
      listItemsElements = screen.getAllByTitle('list-item');
      expect(listItemsElements[0]).toHaveAttribute(
        'data-testid',
        stationWithSmallestPopularityTestId,
      );
      expect(listItemsElements[1]).toHaveAttribute(
        'data-testid',
        stationWithMediumPopularityTestId,
      );
      expect(listItemsElements[2]).toHaveAttribute(
        'data-testid',
        stationWithHighestPopularityTestId,
      );

      // 1st time clicks on "clear all" button
      fireEvent.click(clearAllButtonElement);
      expect(popularitySortOptionElement).not.toHaveClass('selected');

      // new order
      listItemsElements = screen.getAllByTitle('list-item');
      expectTheInitialOrder();
    });
  });
});
