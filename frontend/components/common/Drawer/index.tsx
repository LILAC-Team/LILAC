import * as S from "./style";
import React, { useState, KeyboardEvent, MouseEvent, useEffect } from "react";
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
  const [innerWidth, setInnerWidth] = useState(0);
  const [mytext, setMytext] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setInnerWidth(window.innerWidth);
      const resizeListener = () => {
        setInnerWidth(window.innerWidth);
      };
      window.addEventListener("resize", resizeListener);
      return () => {
        window.removeEventListener("resize", resizeListener);
      };
    }
  }, []);

  useEffect(() => {
    if (innerWidth > 900) {
      setMytext("calc(((var(--vw, 1vw) * 100) - 900px)/2)");
    } else {
      setMytext("0px");
    }
  }, [innerWidth]);

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  return (
    <S.Drawer>
      <SwipeableDrawer
        sx={{
          "& .MuiPaper-root": {
            width: `calc((var(--vw, 1vw) * 100))`,
            maxWidth: `900px`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: `${mytext}`,
          },
        }}
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
