import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
import {
  togglePlay,
  nextTrack,
  setTrack,
} from "@/store/modules/playerController";

const AudioPlayer = () => {
  const dispatch = useDispatch();
  // const playing = useSelector((state) => state.controller.playing);
  // const currentTrack = useSelector(
  //   (state) => state.controller.currentTrackIndex
  // );
  // const srcArr = useSelector((state) => state.url);
  return (
    <ReactPlayer
      url={srcArr}
      config={{
        file: {
          forceAudio: true,
        },
      }}
    />
  );
};

export default React.memo(AudioPlayer);
