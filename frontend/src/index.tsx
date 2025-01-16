import { createRoot } from "react-dom/client"; // Import `createRoot` as a named export
import App from "./App";
import "../src/components/designConstants/designconstant.css";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(<App />);
}
