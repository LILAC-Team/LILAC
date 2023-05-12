const express = require("express");
const next = require("next");
const axios = require("axios");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

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

  server.listen(3000, (err) => {
    if (err) throw err;
  });
});
