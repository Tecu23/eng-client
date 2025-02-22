import React, { useRef, useState, useCallback } from "react";

import type { Square as SquareType, PieceSymbol, Color, Move } from "chess.js";

import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";

import Square from "@/components/game/Square";
import Piece from "@/components/game/Piece";

import { Ranks, Files, pc2Text } from "@/constants/board";

import { useChess } from "@/context/ChessContext";

import { useWindowSize } from "@/hooks/useWindowSize";

function Board() {
    const { chess, isAtTheTop, isAtTheBottom, addToHistory, capturePiece } =
        useChess();

    const [fromSq, setFromSq] = useState<string | undefined>(undefined);
    const [lastMoveFromSq, setLastMoveFromSq] = useState<string | undefined>(
        undefined,
    );
    const [lastMoveToSq, setLastMoveToSq] = useState<string | undefined>(
        undefined,
    );

    const [promotionPopup, setPromotionPopup] = useState<{
        visible: boolean;
        position: { x: number; y: number };
        square: string | null;
        color: "w" | "b";
    }>({
        visible: false,
        position: { x: 0, y: 0 },
        square: null,
        color: "w",
    });

    const boardRef = useRef<HTMLDivElement>(null);

    const [width, _] = useWindowSize();

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
                    const isPossibleMove = possibleMoves.some(
                        (m: Move) => m.to === squareValue,
                    );
                    const sq = b[r][f];

                    const getClassName = () => {
                        if (fromSq && squareValue === fromSq)
                            return "bg-active-light";
                        if (toSq && squareValue === toSq)
                            return "bg-active-dark";
                        return ((f + r) & 1) === 0
                            ? "bg-square-dark"
                            : "bg-square-light";
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

    const [boardState, setBoardState] = useState<Array<React.JSX.Element>>(
        createBoard(chess.board(), []),
    );

    function onDragStart(e: DragStartEvent) {
        const startSquare = e.active.data.current?.sq;
        if (startSquare) {
            setFromSq(startSquare);
            const possibleMoves = chess.moves({
                square: startSquare,
                verbose: true,
            });
            setBoardState(
                createBoard(
                    chess.board(),
                    possibleMoves,
                    lastMoveFromSq,
                    lastMoveToSq,
                ),
            );
        }
    }

    function onDragEnd(e: DragEndEvent) {
        const endSquare = e.over?.data.current?.sq;

        if (!endSquare || !fromSq) {
            setBoardState(
                createBoard(chess.board(), [], lastMoveFromSq, lastMoveToSq),
            );
            return;
        }

        const isPromotion =
            chess.get(fromSq as SquareType)?.type === "p" &&
            (chess.turn() === "w"
                ? isAtTheTop(endSquare)
                : isAtTheBottom(endSquare));

        if (isPromotion) {
            // Get the board position to display the popup near the promotion square
            const rect = boardRef.current?.getBoundingClientRect();
            if (rect) {
                const x =
                    (endSquare.charCodeAt(0) - "a".charCodeAt(0)) *
                        (rect.width / 8) +
                    (width < 1024 ? 20 : 28);
                const y = chess.turn() === "w" ? 2 : rect.height;

                setPromotionPopup({
                    visible: true,
                    position: { x, y },
                    square: endSquare,
                    color: chess.turn(),
                });
            }
            return;
        }

        try {
            const move = chess.move({ from: fromSq, to: endSquare });
            addToHistory(move);

            if (move?.captured) {
                capturePiece(move.captured as PieceSymbol, move.color);
            }

            setLastMoveFromSq(fromSq);
            setLastMoveToSq(endSquare);

            setBoardState(createBoard(chess.board(), [], fromSq, endSquare));
        } catch (error) {
            console.error("Invalid move", error);
        }
    }

    function handlePromotionChoice(piece: PieceSymbol) {
        if (promotionPopup.square && fromSq) {
            const move = chess.move({
                from: fromSq,
                to: promotionPopup.square,
                promotion: piece.at(0),
            });
            addToHistory(move);
            if (move?.captured) {
                capturePiece(move.captured as PieceSymbol, move.color);
            }

            setLastMoveFromSq(fromSq);
            setLastMoveToSq(promotionPopup.square);
            setBoardState(
                createBoard(chess.board(), [], fromSq, promotionPopup.square),
            );
            setPromotionPopup({
                visible: false,
                position: { x: 0, y: 0 },
                square: null,
                color: "w",
            });
        }
    }

    return (
        <div className="relative h-[406px] w-[406px] lg:h-[520px] lg:w-[520px]">
            <div className="relative flex h-full w-full items-center justify-center rounded-lg border bg-white pt-2 pr-2 pb-6 pl-6 lg:pb-8 lg:pl-8">
                <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                    <div
                        ref={boardRef}
                        className="grid h-[360px] w-[360px] grid-cols-8 grid-rows-8 lg:h-[480px] lg:w-[480px]"
                    >
                        {boardState}
                    </div>
                </DndContext>
                {promotionPopup.visible && (
                    <div
                        style={{
                            position: "absolute",
                            left: promotionPopup.position.x,
                            top: promotionPopup.position.y,
                            zIndex: 20,
                        }}
                        className="flex h-[188px] w-[51px] flex-col items-center justify-center rounded bg-white p-1 shadow-md lg:h-[288px] lg:w-[68px]"
                    >
                        {["queen", "rook", "bishop", "knight"].map((piece) => {
                            return (
                                <button
                                    type="button"
                                    key={piece}
                                    onClick={() =>
                                        handlePromotionChoice(
                                            piece as PieceSymbol,
                                        )
                                    }
                                    className="flex h-[45px] w-[45px] items-center justify-center bg-white lg:h-[60px] lg:w-[60px]"
                                >
                                    <div
                                        style={{
                                            width: "80%",
                                            height: "80%",

                                            backgroundImage: `url(${`pieces/${piece}_${promotionPopup.color}.svg`})`,
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat",
                                        }}
                                    />
                                </button>
                            );
                        })}
                    </div>
                )}
                {/* Ranks and Files Markers */}
                <div className="absolute top-0 left-0 flex h-full w-6 flex-col items-center justify-start bg-transparent pt-2 lg:w-8">
                    {[8, 7, 6, 5, 4, 3, 2, 1].map((num) => (
                        <p
                            key={num}
                            className="flex h-[45px] w-2 items-center justify-center text-sm font-medium lg:h-[60px] lg:text-xl"
                        >
                            {num}
                        </p>
                    ))}
                </div>
                <div className="absolute bottom-0 left-0 flex h-6 w-full flex-row items-center justify-end bg-transparent pr-2 lg:h-8">
                    {["a", "b", "c", "d", "e", "f", "g", "h"].map((num) => (
                        <p
                            key={num}
                            className="flex h-2 w-[45px] items-center justify-center text-sm font-medium uppercase lg:w-[60px] lg:text-xl"
                        >
                            {num}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Board;
