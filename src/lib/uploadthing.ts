// src/lib/uploadthing.ts
import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "../../api/uploadthing/core";

// For development, we'll use the direct UploadThing client
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
