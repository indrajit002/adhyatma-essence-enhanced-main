// pages/api/uploadthing/[...uploadthing].ts
import { createNextApiHandler } from "uploadthing/next";
import { ourFileRouter } from "../../../api/uploadthing/core";

const handler = createNextApiHandler({
  router: ourFileRouter,
});

export default handler;
