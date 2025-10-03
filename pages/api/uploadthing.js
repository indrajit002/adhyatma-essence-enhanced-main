// pages/api/uploadthing.js - Vercel API route for UploadThing
const { createRouteHandler } = require("uploadthing/server");

console.log("🚀 UploadThing API: Starting...");

// Define the file router inline
const f = require("uploadthing/server").createUploadthing();

const auth = (req) => {
  console.log("🔐 API: Auth called");
  return { id: "admin-user" };
};

const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      console.log("🛡️ API: Middleware called");
      const user = await auth(req);
      if (!user) {
        console.log("❌ API: Unauthorized");
        throw new Error("Unauthorized");
      }
      console.log("✅ API: User authorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("🎉 API: Upload complete!");
      console.log("📁 File:", file.name, file.url);
      
      return { 
        uploadedBy: metadata.userId,
        url: file.url,
        name: file.name,
        size: file.size
      };
    }),
};

console.log("🔧 API: Creating route handler...");

const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});

console.log("✅ API: Route handler created");

// Export the handlers directly
module.exports = { GET, POST };