import React from "react";
import type { Dispatch } from "react";

import type { Chess, Move, PieceSymbol, Square as SquareType, Color } from "chess.js";

export interface PieceType {
    type: string;
    color: string;
}

export type GameSettings = {
    id: string | null;
    fen: string | null;
};

export interface ChessContextValue {
    boardState: Array<React.JSX.Element>;
    updateBoardState: (b: Array<React.JSX.Element>) => void;
    createBoard: (
        b: Array<Array<{ square: SquareType; type: PieceSymbol; color: Color } | null>>,
        possibleMoves: Array<Move>,
        fromSq?: string,
        toSq?: string,
    ) => Array<React.JSX.Element>;

    chess: Chess;

    gameSettings: GameSettings;
    updateGameSettings: (settings: GameSettings) => void;

    whiteTime: number;
    blackTime: number;
    updateTime: (time: number, player: Color) => void;

    possibleMoves: Move[];

    makeEngineMove: (mv: string) => void;

    moveHistory: Move[];
    addToHistory: (move: Move) => void;

    setPossibleMoves: Dispatch<React.SetStateAction<Array<Move>>>;
    isAtTheTop: (arg: SquareType) => boolean;
    isAtTheBottom: (arg: SquareType) => boolean;

    capturedBlackPieces: PieceSymbol[];
    capturedWhitePieces: PieceSymbol[];

    capturePiece: (piece: PieceSymbol, color: Color) => void;
}

export interface PopUpContextValue {
    open: boolean;
    popUpData: PopUpDataType | null;
    triggerPopUp: (data: PopUpDataType) => void;
    closePopUp: () => void;
}

export type PopUpDataType = {
    header: string;
    body: string;
};
