import { useRef, useEffect } from "react";

import { XMarkIcon } from "@heroicons/react/16/solid";

import { usePopUp } from "@/context/PopUpContext";

const PopUp = () => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { popUpData, closePopUp } = usePopUp();

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            closePopUp();
        }, 1500);
        return () => clearTimeout(timeoutRef.current as NodeJS.Timeout);
    }, [closePopUp]);

    return (
        <div className="absolute top-0 right-0 z-20 mt-4 mr-4 flex max-h-56 max-w-96 items-start gap-2 overflow-auto rounded-md bg-white p-4 shadow-md">
            <button
                type="button"
                onClick={() => {
                    clearTimeout(timeoutRef.current as NodeJS.Timeout);
                    closePopUp();
                }}
            >
                <XMarkIcon className="-mt-[2px] h-8 w-8 flex-shrink-0 flex-grow-0 font-semibold text-red-600" />
            </button>
            <div>
                <h2 className="text-piece mb-4 text-2xl font-semibold">{popUpData?.header}</h2>
                <p className="text-piece text-md">{popUpData?.body}</p>
            </div>
        </div>
    );
};

export default PopUp;
