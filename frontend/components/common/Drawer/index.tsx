import * as S from "./style";
import React, { useState, KeyboardEvent, MouseEvent } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MusicPlayerDrawer from "@/components/Player/MusicPlayerDrawer";
import CommentDrawer from "@/components/Player/CommentDrawer";
import PlaylistDrawer from "@/components/Player/PlaylistDrawer";

interface DrawerProps {
  inner: string;
  anchor: string;
  toggleDrawer: (
    anchor: string,
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  state: {
    bottom: boolean;
  };
}

const Drawer = ({ inner, anchor, state, toggleDrawer }: DrawerProps) => {
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  return (
    <S.Drawer>
      <SwipeableDrawer
        anchor="bottom"
        open={state["bottom"]}
        onClose={toggleDrawer("bottom", false)}
        onOpen={toggleDrawer("bottom", true)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        PaperProps={{ style: { backgroundColor: "transparent" } }}
      >
        {inner === "player" && <MusicPlayerDrawer />}
        {inner === "comment" && <CommentDrawer />}
        {inner === "playlist" && <PlaylistDrawer />}
      </SwipeableDrawer>
    </S.Drawer>
  );
};

export default Drawer;
