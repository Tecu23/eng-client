import { createContext, useState, useContext, useCallback } from "react";
import type { ReactNode } from "react";

import type { PopUpContextValue, PopUpDataType } from "../types";

const PopUpContext = createContext<PopUpContextValue | undefined>(undefined);

const usePopUp = () => {
    const context = useContext(PopUpContext);

    if (!context) {
        throw Error("chess context not loaded");
    }

    return context;
};

type Props = {
    children?: ReactNode;
};

const PopUpProvider = ({ children }: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [popUpData, setPopUpData] = useState<PopUpDataType | null>(null);

    const triggerPopUp = useCallback((data: PopUpDataType) => {
        setOpen(true);
        setPopUpData(data);
    }, []);

    const closePopUp = useCallback(() => {
        setOpen(false);
        setPopUpData(null);
    }, []);

    return (
        <PopUpContext.Provider value={{ open, popUpData, triggerPopUp, closePopUp }}>{children}</PopUpContext.Provider>
    );
};

export { PopUpProvider, usePopUp };
