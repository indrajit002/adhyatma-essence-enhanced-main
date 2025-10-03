// pages/api/test.js - Simple test API
export default function handler(req, res) {
  console.log("🧪 Test API called");
  
  res.status(200).json({
    message: "Test API is working!",
    method: req.method,
    timestamp: new Date().toISOString(),
    url: req.url
  });
}
