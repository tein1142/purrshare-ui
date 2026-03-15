import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./global.css";
import App from './App.tsx'

const IMG_FALLBACK_SRC = "/image-fallback.svg";

// Any external image that fails (403/404/network) will gracefully fall back.
document.addEventListener(
  "error",
  (event) => {
    const target = event.target;

    if (!(target instanceof HTMLImageElement)) {
      return;
    }

    if (target.dataset.fallbackApplied === "true") {
      return;
    }

    target.dataset.fallbackApplied = "true";
    target.src = IMG_FALLBACK_SRC;
  },
  true
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
