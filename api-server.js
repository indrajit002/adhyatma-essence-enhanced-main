// api-server.js - Development API server
const express = require('express');
const cors = require('cors');

// Import UploadThing with proper error handling
let createRouteHandler;
try {
  const uploadthing = require("uploadthing/server");
  createRouteHandler = uploadthing.createRouteHandler;
} catch (error) {
  console.error("❌ Error importing UploadThing:", error.message);
  process.exit(1);
}

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

console.log("🚀 Development API Server: Starting...");

// Define the file router inline
const f = require("uploadthing/server").createUploadthing();

const auth = (req) => {
  console.log("🔐 Dev API: Auth called");
  return { id: "admin-user" };
};

const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      console.log("🛡️ Dev API: Middleware called");
      const user = await auth(req);
      if (!user) {
        console.log("❌ Dev API: Unauthorized");
        throw new Error("Unauthorized");
      }
      console.log("✅ Dev API: User authorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("🎉 Dev API: Upload complete!");
      console.log("📁 File:", file.name, file.url);
      
      return { 
        uploadedBy: metadata.userId,
        url: file.url,
        name: file.name,
        size: file.size
      };
    }),
};

console.log("🔧 Dev API: Creating route handler...");

const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});

console.log("✅ Dev API: Route handler created");

// Test endpoint
app.get('/api/test', (req, res) => {
  console.log("🧪 Test API called");
  res.json({
    message: "Test API is working!",
    method: req.method,
    timestamp: new Date().toISOString(),
    url: req.url
  });
});

// UploadThing endpoints
app.all('/api/uploadthing', (req, res) => {
  console.log(`📡 UploadThing API called: ${req.method}`);
  
  try {
    if (req.method === 'GET') {
      console.log("🔍 Handling GET request");
      GET(req, res);
    } else if (req.method === 'POST') {
      console.log("📤 Handling POST request");
      POST(req, res);
    } else {
      console.log("❌ Method not allowed:", req.method);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error("❌ UploadThing API Error:", error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Development API server running on http://localhost:${PORT}`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`📤 UploadThing endpoint: http://localhost:${PORT}/api/uploadthing`);
});
