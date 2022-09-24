import React, { useState } from 'react';

import { StationData } from 'types/Stations';
import StationListItem from 'components/Stations/StationListItem';

import { StationsListProps } from './StationsList.types';

const StationsList = ({ stations }: StationsListProps) => {
  const [playingStationId, setPlayingStationId] = useState<null | string>(null);

  const handlePlayStationClick = (stationId: string) => {
    setPlayingStationId(stationId);
  };

  return (
    <>
      <h3>Stations</h3>
      <ul data-testid="stations-list">
        {stations?.map((stationItem: StationData) => (
          <StationListItem
            key={stationItem.id}
            stationData={stationItem}
            playingStationId={playingStationId}
            onPlayStationClick={handlePlayStationClick}
          />
        ))}
      </ul>
    </>
  );
}

export default StationsList;
