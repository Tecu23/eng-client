import { useState, createContext, useContext, useCallback } from "react";
import type { ReactNode } from "react";

import Square from "@/components/game/Square";
import Piece from "@/components/game/Piece";

import { Chess } from "chess.js";
import type { Color, Move, PieceSymbol, Square as SquareType } from "chess.js";

import type { ChessContextValue } from "../types";

import { Files, Ranks, pc2Text } from "@/constants/board";

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

    const [capturedWhitePieces, setCapturedWhitePieces] = useState<PieceSymbol[]>([]);
    const [capturedBlackPieces, setCapturedBlackPieces] = useState<PieceSymbol[]>([]);

    const isAtTheTop = (sq: SquareType) => sq.includes("8");
    const isAtTheBottom = (sq: SquareType) => sq.includes("1");

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

    const createBoard = useCallback(
        (
            b: Array<
                Array<{
                    square: SquareType;
                    type: PieceSymbol;
                    color: Color;
                } | null>
            >,
            possibleMoves: Array<Move>,
            fromSq?: string,
            toSq?: string,
        ): Array<React.JSX.Element> => {
            const board: Array<React.JSX.Element> = [];

            for (let r = 0; r < b.length; r++) {
                for (let f = 0; f < b[0].length; f++) {
                    const squareValue = Files[f].toLowerCase() + Ranks[7 - r];
                    const isPossibleMove = possibleMoves.some((m: Move) => m.to === squareValue);
                    const sq = b[r][f];

                    const getClassName = () => {
                        if (fromSq && squareValue === fromSq) return "bg-active-light";
                        if (toSq && squareValue === toSq) return "bg-active-dark";
                        return ((f + r) & 1) === 0 ? "bg-square-dark" : "bg-square-light";
                    };

                    board.push(
                        <Square
                            isPossibleMove={isPossibleMove}
                            className={getClassName()}
                            key={squareValue}
                            sq={squareValue}
                            piece={
                                sq ? (
                                    <Piece
                                        color={sq.color}
                                        type={sq.type}
                                        sq={squareValue}
                                        image={`pieces/${pc2Text[sq.type]}_${sq.color}.svg`}
                                    />
                                ) : undefined
                            }
                        />,
                    );
                }
            }
            return board;
        },
        [],
    );

    return (
        <ChessContext.Provider
            value={{
                chess, // Should probably remove chess from here

                createBoard,

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
