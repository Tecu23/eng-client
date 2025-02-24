import React, { useState, createContext, useContext, useCallback, useEffect } from "react";
import type { ReactNode } from "react";

import Square from "@/components/game/Square";
import Piece from "@/components/game/Piece";

import { Chess } from "chess.js";
import type { Color, Move, PieceSymbol, Square as SquareType } from "chess.js";

import type { ChessContextValue, GameSettings } from "../types";

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

    const [gameSettings, setGameSettings] = useState<GameSettings>({
        id: null,
        fen: null,
    });

    const [whiteTime, setWhiteTime] = useState(600_000);
    const [blackTime, setBlackTime] = useState(600_000);

    const [moveHistory, setMoveHistory] = useState<Move[]>([]);
    const [possibleMoves, setPossibleMoves] = useState<Move[]>([]);

    const [capturedWhitePieces, setCapturedWhitePieces] = useState<PieceSymbol[]>([]);
    const [capturedBlackPieces, setCapturedBlackPieces] = useState<PieceSymbol[]>([]);

    const isAtTheTop = (sq: SquareType) => sq.includes("8");
    const isAtTheBottom = (sq: SquareType) => sq.includes("1");

    const addToHistory = (move: Move) => {
        setMoveHistory([...moveHistory, move]);
    };

    const [boardState, setBoardState] = useState<Array<React.JSX.Element>>([]);

    const capturePiece = (piece: PieceSymbol, color: Color) => {
        if (color === "w") {
            setCapturedBlackPieces((prev) => [...prev, piece]);
        } else {
            setCapturedWhitePieces((prev) => [...prev, piece]);
        }
    };

    const updateTime = useCallback((time: number, player: Color) => {
        if (player == "w") {
            setWhiteTime(time);
        } else {
            setBlackTime(time);
        }
    }, []);

    const updateGameSettings = useCallback((settings: GameSettings) => {
        setGameSettings(settings);
    }, []);

    const updateBoardState = useCallback((b: Array<React.JSX.Element>) => {
        setBoardState(b);
    }, []);

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

    const makeEngineMove = useCallback(
        (mv: string) => {
            const fromSq = mv.substring(0, 2);
            const toSq = mv.substring(2, 4);

            const move = chess.move({ from: fromSq, to: toSq });
            addToHistory(move);

            if (move?.captured) {
                capturePiece(move.captured as PieceSymbol, move.color);
            }

            const elems = document.querySelectorAll(`.possible-move`);
            elems.forEach((elem) => {
                elem.classList.remove("possible-move");
            });

            updateBoardState(createBoard(chess.board(), [], fromSq, toSq));
        },
        [chess, createBoard, updateBoardState, addToHistory],
    );

    useEffect(() => {
        updateBoardState(createBoard(chess.board(), []));
    }, []);

    return (
        <ChessContext.Provider
            value={{
                chess, // Should probably remove chess from here

                boardState,
                updateBoardState,
                createBoard,

                gameSettings,
                updateGameSettings,

                whiteTime,
                blackTime,
                updateTime,

                makeEngineMove,

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
