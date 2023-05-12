const express = require("express");
const next = require("next");
const axios = require("axios");
const MyWebSocket = require("ws");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// app.all("*", (req, res) => {
//   return handle(req, res);
// });

app.prepare().then(() => {
  const server = express();

  // 로그인 여부를 확인하는 미들웨어
  const checkAuthMiddleware = async (req, res, next) => {
    // 로그인 여부를 확인하는 로직을 구현
    // console.log("-------------req-------------: ", req.headers.cookie);
    try {
      axios.get("https://lilac-music.net/api/v1/members", {
        headers: {
          Authorization: req.headers.cookie.Authorization,
        },
      });
      next();
    } catch (error) {
      res.redirect("/login");
    }
  };

  server.get("/", checkAuthMiddleware, (req, res) => {
    return handle(req, res);
  });

  server.get("/form", checkAuthMiddleware, (req, res) => {
    return handle(req, res);
  });

  server.get("/album", checkAuthMiddleware, (req, res) => {
    return handle(req, res);
  });

  server.get("/album/:id", checkAuthMiddleware, (req, res) => {
    return handle(req, res);
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  const wss = new MyWebSocket.Server({ noServer: true });

  wss.on("connection", (ws) => {
    console.log("WebSocket connection established");

    // WebSocket 이벤트 처리
    ws.on("message", (message) => {
      console.log("Received message:", message);
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed");
    });
  });

  server.on("upgrade", (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req);
    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
  });
});
