// test-upload-setup.js
// Simple script to test if the upload setup is working

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking UploadThing Setup...\n');

// Check if required files exist
const requiredFiles = [
  'api/uploadthing/core.ts',
  'pages/api/uploadthing/[...uploadthing].ts',
  'src/components/ProductForm.tsx',
  'src/pages/TestUpload.tsx'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - Found`);
  } else {
    console.log(`❌ ${file} - Missing`);
    allFilesExist = false;
  }
});

// Check package.json for uploadthing dependencies
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const hasUploadThing = packageJson.dependencies['@uploadthing/react'] && packageJson.dependencies['uploadthing'];

if (hasUploadThing) {
  console.log('✅ UploadThing dependencies - Installed');
} else {
  console.log('❌ UploadThing dependencies - Missing');
  allFilesExist = false;
}

console.log('\n📋 Testing Instructions:');
console.log('1. Make sure you have set up your UploadThing account and environment variables');
console.log('2. Start the development server: npm run dev');
console.log('3. Navigate to: http://localhost:8080/test-upload');
console.log('4. Try uploading an image to test the functionality');
console.log('5. Check the browser console for any errors');

if (allFilesExist) {
  console.log('\n🎉 Setup looks good! Ready for testing.');
} else {
  console.log('\n⚠️  Some files are missing. Please check the setup.');
}

console.log('\n🔧 Environment Variables Needed:');
console.log('UPLOADTHING_SECRET=your_secret_here');
console.log('UPLOADTHING_APP_ID=your_app_id_here');
console.log('VITE_SUPABASE_URL=your_supabase_url_here');
console.log('VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here');
