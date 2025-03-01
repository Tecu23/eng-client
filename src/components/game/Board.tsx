import { useRef, useState } from "react";

import type { Square as SquareType, PieceSymbol, Move } from "chess.js";

import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";

import { Ranks, Files } from "@/constants/board";

import { useChess } from "@/context/ChessContext";

import moveSelfSound from "@/assets/sounds/promote.mp3";
import { XMarkIcon } from "@heroicons/react/20/solid";

type Props = {
    makePlayerMove: (move: string) => void;
};

function Board({ makePlayerMove }: Props) {
    const moveSelfAudio = new Audio(moveSelfSound);

    const boardRef = useRef<HTMLDivElement>(null);
    const { chess, boardState, updateBoardState, createBoard, isAtTheTop, isAtTheBottom, addToHistory, capturePiece } =
        useChess();

    const [fromSq, setFromSq] = useState<string | undefined>(undefined);

    const [promotionPopup, setPromotionPopup] = useState<{
        visible: boolean;
        position: { x: number; y: number };
        square: string | null;
        color: "w" | "b";
    }>({ visible: false, position: { x: 0, y: 0 }, square: null, color: "w" });

    function onDragStart(e: DragStartEvent) {
        const startSquare = e.active.data.current?.sq;
        if (startSquare) {
            setFromSq(startSquare);
            const possibleMoves = chess.moves({
                square: startSquare,
                verbose: true,
            });
            possibleMoves.forEach((move: Move) => {
                const elem = document.querySelector(`#${move.to}`);
                if (elem != null) {
                    elem.classList.add("possible-move");
                }
            });
        }
    }

    function onDragEnd(e: DragEndEvent) {
        const endSquare = e.over?.data.current?.sq;

        if (!endSquare || !fromSq) {
            const elems = document.querySelectorAll(`.possible-move`);
            elems.forEach((elem) => {
                elem.classList.remove("possible-move");
            });
            return;
        }

        if (endSquare == fromSq) {
            const elems = document.querySelectorAll(`.possible-move`);
            elems.forEach((elem) => {
                elem.classList.remove("possible-move");
            });
            return;
        }

        const isPromotion =
            chess.get(fromSq as SquareType)?.type === "p" &&
            (chess.turn() === "w" ? isAtTheTop(endSquare) : isAtTheBottom(endSquare));

        if (isPromotion) {
            // Get the board position to display the popup near the promotion square
            const rect = boardRef.current?.getBoundingClientRect();
            if (rect) {
                const x = (endSquare.charCodeAt(0) - "a".charCodeAt(0)) * (rect.width / 8) + 28;
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
            makePlayerMove(move.lan);

            if (move?.captured) {
                capturePiece(move.captured as PieceSymbol, move.color);
            }

            const elems = document.querySelectorAll(`.possible-move`);
            elems.forEach((elem) => {
                elem.classList.remove("possible-move");
            });

            moveSelfAudio.play();
            updateBoardState(createBoard(chess.board(), [], fromSq, endSquare));
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
            makePlayerMove(move.lan);
            if (move?.captured) {
                capturePiece(move.captured as PieceSymbol, move.color);
            }

            const elems = document.querySelectorAll(`.possible-move`);
            elems.forEach((elem) => {
                elem.classList.remove("possible-move");
            });

            // re-create board after move
            updateBoardState(createBoard(chess.board(), [], fromSq, promotionPopup.square));

            // Reset Promotion popup
            setPromotionPopup({
                visible: false,
                position: { x: 0, y: 0 },
                square: null,
                color: "w",
            });
        }
    }

    return (
        <>
            <div className="relative aspect-square w-full rounded-md">
                <div className="relative flex h-full w-full items-center justify-center rounded-lg bg-white">
                    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                        <div ref={boardRef} className="grid aspect-square w-full grid-cols-8 grid-rows-8">
                            {boardState}
                        </div>
                    </DndContext>
                    {promotionPopup.visible && (
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                zIndex: 20,
                                boxShadow: "3px 3px 10px rgba(0,0,0,0.65)",
                            }}
                            className="flex h-[56.25%] w-[12.5%] translate-x-[200%] transform flex-col items-center justify-center rounded bg-white"
                        >
                            {["queen", "rook", "bishop", "knight"].map((piece) => {
                                return (
                                    <button
                                        type="button"
                                        key={piece}
                                        onClick={() => handlePromotionChoice(piece as PieceSymbol)}
                                        className="flex h-full w-full items-center justify-center hover:bg-gray-100"
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
                            <div className="flex h-[11.11%] w-full flex-grow items-center justify-center bg-gray-100">
                                <XMarkIcon className="h-full w-full" />
                            </div>
                        </div>
                    )}
                    <div className="absolute bottom-0 left-0 flex w-full">
                        {Files.map((f, idx) => (
                            <div
                                className={`flex w-[12.5%] items-end justify-end px-1 py-3 text-lg leading-0 font-semibold ${idx % 2 == 1 ? "text-square-light" : "text-square-dark"}`}
                            >
                                {f}
                            </div>
                        ))}
                    </div>
                    <div className="absolute top-0 left-0 flex h-full flex-col-reverse">
                        {Ranks.map((r, idx) => (
                            <div
                                className={`flex h-[12.5%] items-start justify-end px-1 py-3 text-lg leading-1 font-semibold ${idx % 2 == 1 ? "text-square-light" : "text-square-dark"}`}
                            >
                                {r}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Board;
