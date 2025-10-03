// api/uploadthing/route.ts
import { createRouteHandler } from "uploadthing/server";
import { ourFileRouter } from "./core";

// Export routes for the Vercel serverless environment
const handler = createRouteHandler({
  router: ourFileRouter,
});

export { handler as GET, handler as POST };
