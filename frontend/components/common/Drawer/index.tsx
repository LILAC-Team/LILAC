import * as S from "./style";
import React, { useState, useEffect } from "react";
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

const iOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

const Drawer = ({ inner, anchor, state, toggleDrawer }: DrawerProps) => {
  const [innerWidth, setInnerWidth] = useState("100%");
  const [mytext, setMytext] = useState("");

  useEffect(() => {
    const resize = () => {
      console.log("흠");
      let width = window.innerWidth;
      if (window.innerWidth >= 900) {
        setMytext(`${(width - 900) / 2}px`);
      } else {
        setMytext("0px");
      }
    };
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <S.Drawer>
      <SwipeableDrawer
        sx={{
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: `900px`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: `${mytext}`,
          },
        }}
        anchor='bottom'
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
