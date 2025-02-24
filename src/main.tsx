import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { PopUpProvider } from "@/context/PopUpContext.tsx";

import App from "./App.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <PopUpProvider>
            <App />
        </PopUpProvider>
    </StrictMode>,
);
