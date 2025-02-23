import React from "react";
import type { Dispatch } from "react";

import type { Chess, Move, PieceSymbol, Square as SquareType, Color } from "chess.js";

export interface PieceType {
    type: string;
    color: string;
}

export interface ChessContextValue {
    createBoard: (
        b: Array<Array<{ square: SquareType; type: PieceSymbol; color: Color } | null>>,
        possibleMoves: Array<Move>,
        fromSq?: string,
        toSq?: string,
    ) => Array<React.JSX.Element>;

    chess: Chess;
    possibleMoves: Move[];

    moveHistory: Move[];
    addToHistory: (move: Move) => void;

    setPossibleMoves: Dispatch<React.SetStateAction<Array<Move>>>;
    isAtTheTop: (arg: SquareType) => boolean;
    isAtTheBottom: (arg: SquareType) => boolean;

    capturedBlackPieces: PieceSymbol[];
    capturedWhitePieces: PieceSymbol[];

    capturePiece: (piece: PieceSymbol, color: Color) => void;
}
