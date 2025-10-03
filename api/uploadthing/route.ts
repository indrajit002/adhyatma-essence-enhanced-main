// /api/uploadthing/route.ts
import { createRouteHandler } from "uploadthing/server";
import { ourFileRouter } from "./core";

// Export routes for the Vercel serverless environment
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});