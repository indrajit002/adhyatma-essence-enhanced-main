// api-server.cjs - Development API server
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

console.log("🚀 Development API Server: Starting...");

// Simple UploadThing mock for development
console.log("🔧 Dev API: Using mock UploadThing implementation...");

// Mock file router configuration
const mockFileRouter = {
  imageUploader: {
    maxFileSize: "4MB",
    maxFileCount: 1,
    fileTypes: ["image"],
    middleware: "auth",
    onUploadComplete: "callback"
  }
};

// Mock handlers
const GET = (req, res) => {
  console.log("🔍 UploadThing GET request - returning router config");
  res.json(mockFileRouter);
};

const POST = (req, res) => {
  console.log("📤 UploadThing POST request - handling file upload");
  
  // Mock successful upload response
  const mockUploadResponse = {
    success: true,
    message: "File uploaded successfully",
    file: {
      url: "https://utfs.io/f/mock-file-url.jpg",
      name: "mock-image.jpg",
      size: 1024000,
      uploadedBy: "admin-user"
    }
  };
  
  res.json(mockUploadResponse);
};

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
