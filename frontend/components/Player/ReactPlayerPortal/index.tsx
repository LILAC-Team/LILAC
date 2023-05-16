import React, { useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { createPortal } from "react-dom";
import { nextTrack, PutStartingPointToZero } from "@/store/modules/playList";
import { useSelector, useDispatch } from "react-redux";
import { playListState } from "@/store/modules/playList";
import { musicApi } from "@/api/utils/music";
import { setTime } from "@/store/modules/commentList";
import {
  setRecentCommentList,
  setTotalCommentList,
} from "@/store/modules/commentList";
interface MusicControllerState {
  playList: playListState;
}

// const ReactPlayerPortal: React.FC = React.memo(() => {
const ReactPlayerPortal = () => {
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const { loop, playing, OnSeekToZero, currPlayingMusicInfo } = useSelector(
    (state: MusicControllerState) => state.playList
  );

  useEffect(() => {
    if (OnSeekToZero) {
      playerRef.current.seekTo(0);
      dispatch(PutStartingPointToZero(false));
    }
  }, [dispatch, OnSeekToZero]);

  useEffect(() => {
    if (currPlayingMusicInfo.code) {
      console.log("currPlayingMusicInfo.code: ", currPlayingMusicInfo.code);
      musicApi
        .getMusicInfo(currPlayingMusicInfo.code)
        .then(({ data: { recentCommentList } }) => {
          dispatch(setRecentCommentList({ recentCommentList }));
          return musicApi.getCommentList(currPlayingMusicInfo.code, 1);
        })
        .then(
          ({
            data: {
              commentList,
              totalPages,
              totalElements,
              number,
              first,
              last,
            },
          }) => {
            dispatch(
              setTotalCommentList({
                commentList,
                totalPages,
                totalElements,
                number,
                first,
                last,
              })
            );
          }
        )
        .catch((error) => {
          console.log("error: ", error);
        });
    }
  }, [currPlayingMusicInfo]);

  const handleClickForward = () => {
    playerRef.current.seekTo(0);
    dispatch(nextTrack());
  };
  return (
    <ReactPlayer
      ref={playerRef}
      playing={playing}
      loop={loop}
      url={currPlayingMusicInfo ? currPlayingMusicInfo.src : ""}
      onProgress={(progress) => {
        dispatch(setTime({ time: progress.playedSeconds }));
      }}
      stopOnUnmount={true}
      config={{
        file: {
          forceAudio: true,
          forceHLS: true,
          forceSafariHLS: true,
        },
      }}
      onEnded={handleClickForward}
      width={0}
      height={0}
    />
  );
};

export default ReactPlayerPortal;
