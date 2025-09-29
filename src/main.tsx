import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Add debug utility in development
if (import.meta.env.DEV) {
  import('./utils/debug-products.ts');
}

createRoot(document.getElementById("root")!).render(<App />);
