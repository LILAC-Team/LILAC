const express = require("express");
const next = require("next");
const axios = require("axios");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
// const { renderToHTML } = require("next/dist/next-server/server/render");
// const { NextApiRequest, NextApiResponse } = require("next");
// const { ParsedUrlQuery } = require("querystring");
// const { renderToString } = require("@types/next");

// interface CustomRequest extends NextApiRequest {
//   query: ParsedUrlQuery;
//   params?: { [key: string]: string };
// }

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
    // return app.render(req, res, "/", req.query);
    // const html = await renderToString(req, res, "/", req.query);
    // return res.send(html);
    return handle(req, res);
  });

  server.get("/form", checkAuthMiddleware, (req, res) => {
    // return app.render(req, res, "/form", req.query);
    // const html = await renderToString(req, res, "/form", req.query);
    // return res.send(html);
    return handle(req, res);
  });

  server.get("/album", checkAuthMiddleware, (req, res) => {
    // return app.render(req, res, "/album", req.query);
    // const html = await renderToString(req, res, "/album", req.query);
    // return res.send(html);
    return handle(req, res);
  });

  server.get("/album/:id", checkAuthMiddleware, (req, res) => {
    // const html = await renderToString(req, res, "/album/[id]", req.query, {
    //   id: req.params.id,
    // });
    // return res.send(html);
    // return app.render(req, res, "/album/:id", req.query);
    return handle(req, res);
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
  });
});
