import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { createStationMock, generateRandomId } from 'components/Stations/Stations.utils';

import StationListItem from './index';

describe('StationListItem', () => {
  let playMock: jest.SpyInstance;
  let pauseMock: jest.SpyInstance;

  const stationMocked = createStationMock();

  beforeEach(() => {
    playMock = jest
      .spyOn(HTMLMediaElement.prototype, 'play')
      .mockReturnValue(new Promise(() => {}));
    pauseMock = jest
      .spyOn(HTMLMediaElement.prototype, 'pause')
      .mockReturnValue();
  });

  afterEach(jest.clearAllMocks);

  test('renders the correct elements in the initial state', async () => {
    await render(
      <StationListItem
        stationData={stationMocked}
        playingStationId={null}
        onPlayStationClick={() => {}}
      />
    );

    expect(screen.queryByTestId('play-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('pause-icon')).not.toBeInTheDocument();
  });

  test('plays the station and renders the correct elements when the user clicks on station list item', async () => {
    const stationData = createStationMock({
      id: generateRandomId(),
    });

    await render(
      <StationListItem
        stationData={stationData}
        playingStationId={stationData.id}
        onPlayStationClick={() => {}}
      />
    );

    const stationListItemElement = screen.getByTestId(`station-list-item-${stationData.id}`);
    fireEvent.click(stationListItemElement);

    expect(playMock).toHaveBeenCalled();
    expect(pauseMock).not.toHaveBeenCalled();
    expect(screen.queryByTestId('play-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('pause-icon')).toBeInTheDocument();
  });

  test('pauses the station and renders the correct elements when the user clicks on the station which is already playing', async () => {
    const stationData = createStationMock({
      id: generateRandomId(),
    });

    await render(
      <StationListItem
        stationData={stationData}
        playingStationId={null}
        onPlayStationClick={() => {}}
      />
    );

    const stationListItemElement = screen.getByTestId(`station-list-item-${stationData.id}`);
    fireEvent.click(stationListItemElement);
    expect(playMock).toHaveBeenCalled();

    fireEvent.click(stationListItemElement);
    expect(pauseMock).toHaveBeenCalled();

    expect(screen.queryByTestId('play-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('pause-icon')).not.toBeInTheDocument();
  });
});
