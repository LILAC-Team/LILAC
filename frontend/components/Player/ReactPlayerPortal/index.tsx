import React, { useRef } from "react";
import ReactPlayer from "react-player";
import { createPortal } from "react-dom";
import {
  togglePlay,
  setShuffle,
  nextTrack,
  setTrack,
} from "@/store/modules/playList";
import { useSelector, useDispatch } from "react-redux";
import { playListState } from "@/store/modules/playList";
interface MusicControllerState {
  playList: playListState;
}
const ReactPlayerPortal: React.FC = React.memo(() => {
  const playerRef = useRef(null);
  const dispatch = useDispatch();

  const handleClickForward = () => {
    playerRef.current.seekTo(0);
    dispatch(nextTrack());
  };
  const {
    playing,
    currentTrackIndex,
    currPlayingMusicInfo,
    musicList,
    shuffleArr,
    musicListSize,
    listSize,
  } = useSelector((state: MusicControllerState) => state.playList);
  return createPortal(
    <ReactPlayer
      ref={playerRef}
      playing={playing}
      url={currPlayingMusicInfo.src}
      stopOnUnmount={true}
      config={{
        file: {
          forceAudio: true,
          forceHLS: true,
        },
      }}
      onEnded={handleClickForward}
      width={0}
      height={0}
    />,
    document.body
  );
});

ReactPlayerPortal.displayName = "ReactPlayerPortal";

export default ReactPlayerPortal;
