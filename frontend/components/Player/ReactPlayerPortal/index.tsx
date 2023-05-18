import React, { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { createPortal } from "react-dom";
import { nextTrack, PutStartingPointToZero } from "@/store/modules/playList";
import { useSelector, useDispatch } from "react-redux";
import { playListState, togglePlay } from "@/store/modules/playList";
import { musicApi } from "@/api/utils/music";
import {
  setTime,
  commentListState,
  setOnChange,
} from "@/store/modules/commentList";
import {
  setRecentCommentList,
  setTotalCommentList,
} from "@/store/modules/commentList";

interface MusicControllerState {
  playList: playListState;
}
interface commentState {
  commentList: commentListState;
}
// const ReactPlayerPortal: React.FC = React.memo(() => {
const ReactPlayerPortal = () => {
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const [seeking, setSeeking] = useState(false);
  const { loop, playing, OnSeekToZero, currPlayingMusicInfo } = useSelector(
    (state: MusicControllerState) => state.playList
  );
  const { time, onChange } = useSelector(
    (state: commentState) => state.commentList
  );
  useEffect(() => {
    if (OnSeekToZero) {
      playerRef.current.seekTo(0);
      dispatch(PutStartingPointToZero(false));
    } else if (onChange) {
      playerRef.current.seekTo(time);
      dispatch(setOnChange({ onChangeValue: false }));
    }
  }, [dispatch, OnSeekToZero, onChange]);

  // useEffect(() => {
  //   if (onChange) {
  //     playerRef.current.seekTo(time);
  //     dispatch(setOnChange({ onChangeValue: false }));
  //   }
  // }, [onChange]);

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
    setSeeking(false);
  };

  return (
    <ReactPlayer
      ref={playerRef}
      playing={playing}
      loop={loop}
      url={currPlayingMusicInfo ? currPlayingMusicInfo.src : ""}
      onProgress={({ playedSeconds }) => {
        if (!onChange) {
          dispatch(setTime({ time: playedSeconds }));
        }
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
