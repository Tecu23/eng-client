import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import { PopUpProvider } from "@/context/PopUpContext.tsx";

import "./index.css";
import { ChessProvider } from "@/context/ChessContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ChessProvider>
            <PopUpProvider>
                <App />
            </PopUpProvider>
        </ChessProvider>
    </StrictMode>,
);
