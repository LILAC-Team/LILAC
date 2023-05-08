// import { NextApiRequest, NextApiResponse } from "next";
// import { redirect } from "next/dist/server/api-utils";

// export default function middleware(req: NextApiRequest, res: NextApiResponse) {
//   const { pathname } = req.url;
//   const confirmUrl = ["/", "/album", "/form"];
//   console.log("pathname: ", pathname);
//   if (confirmUrl.includes(pathname)) {
//     res.redirect(302, "/login");
//   } else {
//     next();
//   }
// }
