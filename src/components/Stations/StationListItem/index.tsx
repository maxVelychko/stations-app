import React, { useRef, useState, useEffect } from 'react';

import { ReactComponent as PlayIcon } from './play.svg';
import { ReactComponent as PauseIcon } from './pause.svg';
import styles from './StationListItem.module.css';
import { StationListItemProps } from './StationListItem.types';

const StationListItem = ({
  stationData,
  playingStationId,
  onPlayStationClick,
}: StationListItemProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isPlaying && playingStationId !== stationData.id) {
      audioRef?.current?.pause();
      setIsPlaying(false);
    }
  }, [isPlaying, playingStationId, stationData.id]);

  const handleStationListItemClick = () => {
    if (isPlaying) {
      audioRef?.current?.pause();
    } else {
      audioRef?.current?.play();
      onPlayStationClick(stationData.id);
    }
    setIsPlaying(!isPlaying);
  };

  const stationImageWrapperClasses = `${styles.stationImageWrapper} ${isPlaying ? styles.isPlaying : ''}`;
  const stationDetailsWrapperClasses = `${styles.stationDetailsWrapper} ${isPlaying ? styles.isPlaying : ''}`;

  return (
    <li
      className={styles.stationListItem}
      onClick={handleStationListItemClick}
      title="list-item"
      data-testid={`station-list-item-${stationData.id}`}
    >
      <button className={styles.stationListItemClickable}>
        <div className={stationImageWrapperClasses}>
          <img src={stationData.imgUrl} className={styles.stationImage} alt="station" />
          {isPlaying ? (
            <PauseIcon
              className={`${styles.icon} ${styles.pauseIcon}`}
              data-testid="pause-icon"
            />
          ) : (
            <PlayIcon
              className={`${styles.icon} ${styles.playIcon}`}
              data-testid="play-icon"
            />
          )}
        </div>
        <div className={stationDetailsWrapperClasses}>
          <p className={styles.stationName}>{stationData.name}</p>
          <p>{stationData.description}</p>
        </div>
        {/* Note: The hardcoded audio file source is applied as the "streamUrl" property of the station referring to the private source. */}
        <audio ref={audioRef} src="./pirates.mp3" tabIndex={1}>
          Your browser does not support HTML5 audio.
        </audio>
      </button>
    </li>
  );
}

export default StationListItem;
