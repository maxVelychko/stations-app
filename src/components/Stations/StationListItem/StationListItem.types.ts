import { StationData } from 'types/Stations';

export interface StationListItemProps {
  stationData: StationData;
  playingStationId: null | string;
  onPlayStationClick: (stationId: string) => void;
};
