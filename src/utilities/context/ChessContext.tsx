import { useState, createContext, useContext } from "react";
import type { ReactNode } from "react";

import { Chess } from "chess.js";
import type { Color, Move, PieceSymbol, Square } from "chess.js";

import type { ChessContextValue } from "../types";

const ChessContext = createContext<ChessContextValue | undefined>(undefined);

const useChess = () => {
    const context = useContext(ChessContext);

    if (!context) {
        throw Error("chess context not loaded");
    }

    return context;
};

type Props = {
    children?: ReactNode;
};

const ChessProvider = ({ children }: Props) => {
    const [chess] = useState(new Chess());

    const [moveHistory, setMoveHistory] = useState<Move[]>([]);
    const [possibleMoves, setPossibleMoves] = useState<Move[]>([]);

    const [capturedWhitePieces, setCapturedWhitePieces] = useState<
        PieceSymbol[]
    >([]);
    const [capturedBlackPieces, setCapturedBlackPieces] = useState<
        PieceSymbol[]
    >([]);

    const isAtTheTop = (sq: Square) => sq.includes("8");
    const isAtTheBottom = (sq: Square) => sq.includes("1");

    const addToHistory = (move: Move) => {
        setMoveHistory([...moveHistory, move]);
    };

    const capturePiece = (piece: PieceSymbol, color: Color) => {
        if (color === "w") {
            setCapturedBlackPieces((prev) => [...prev, piece]);
        } else {
            setCapturedWhitePieces((prev) => [...prev, piece]);
        }
    };

    return (
        <ChessContext.Provider
            value={{
                chess,

                possibleMoves,
                setPossibleMoves,

                moveHistory,
                addToHistory,

                capturedBlackPieces,
                capturedWhitePieces,
                capturePiece,

                isAtTheTop,
                isAtTheBottom,
            }}
        >
            {children}
        </ChessContext.Provider>
    );
};

export { ChessProvider, useChess };
