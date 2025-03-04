import Profile from "@/components/user/Profile";
import { pc2Text } from "@/constants/board";

import { useChess } from "@/context/ChessContext";
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ScaleIcon,
} from "@heroicons/react/20/solid";
import { FlagIcon } from "@heroicons/react/24/outline";
import { Move } from "chess.js";
import { useEffect, useState } from "react";

const BoardSidebar = () => {
    const { gameSettings, moveHistory, capturedBlackPieces, capturedWhitePieces } = useChess();

    const [moves, setMoves] = useState(moveHistory);

    useEffect(() => {
        setMoves(moveHistory);
    }, [moveHistory]);

    const formatMoves = (moves: Move[]): Array<[Move, Move | null]> => {
        const movePairs: Array<[Move, Move | null]> = [];

        for (let i = 0; i < moves.length; i += 2) {
            movePairs.push([moves[i], moves[i + 1]]);
        }
        return movePairs;
    };

    return (
        <div className="flex h-full w-full min-w-60 flex-col justify-between gap-4 place-self-end rounded-lg lg:max-w-xl">
            <Profile
                capturedPieces={capturedBlackPieces}
                time={gameSettings.blackTime}
                color="b"
                name="ArGoX"
                elo="9999"
            />
            <Profile
                capturedPieces={capturedWhitePieces}
                time={gameSettings.whiteTime}
                color="w"
                name="Challenger"
                elo="200"
            />
            <div className="flex h-full min-h-0 min-w-0 flex-auto flex-shrink flex-grow flex-col">
                <div
                    style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
                    className="flex min-h-0 min-w-0 flex-shrink flex-grow basis-0 flex-col overflow-auto"
                >
                    {formatMoves(moves).map((mv: [Move, Move | null], idx: number) => {
                        return (
                            <div
                                key={mv[0].san + (mv[1] != null ? mv[1].san : "")}
                                className={`${idx % 2 == 1 ? "bg-gray-500/10" : ""} grid px-2 py-1 text-white`}
                                style={{ gridTemplateColumns: "100px 1fr 1fr" }}
                            >
                                <p className="text-xs font-medium lg:text-base">{idx}.</p>
                                <div className="flex items-center gap-2">
                                    <img
                                        src={`pieces/${pc2Text[mv[0].piece]}_${mv[0].color}.svg`}
                                        className="h-4 w-4"
                                    />
                                    <p className="font-semibold">{mv[0].san}</p>
                                </div>
                                {mv[1] != null ? (
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={`pieces/${pc2Text[mv[1].piece]}_${mv[1].color}.svg`}
                                            className="h-4 w-4"
                                        />
                                        <p className="font-semibold">{mv[1].san}</p>
                                    </div>
                                ) : null}
                            </div>
                        );
                    })}
                </div>

                <div
                    style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
                    className="flex h-20 h-[144px] flex-shrink-0 flex-grow-0 flex-col gap-4 rounded-b-lg bg-black/10 px-6 py-4"
                >
                    <div className="flex w-full items-center justify-center gap-4">
                        <button className="flex items-center justify-center rounded-md bg-black/10 p-2">
                            <ChevronLeftIcon className="text-square-light h-10 w-10" />
                        </button>
                        <button className="flex items-center justify-center rounded-md bg-black/10 p-2">
                            <ChevronDoubleLeftIcon className="text-square-light h-10 w-10" />
                        </button>
                        <button className="flex items-center justify-center rounded-md bg-black/10 p-2">
                            <ChevronDoubleRightIcon className="text-square-light h-10 w-10" />
                        </button>
                        <button className="flex items-center justify-center rounded-md bg-black/10 p-2">
                            <ChevronRightIcon className="text-square-light h-10 w-10" />
                        </button>
                    </div>
                    <div className="text-square-light flex items-center justify-between gap-3 px-4">
                        <div className="flex items-center gap-2">
                            <ScaleIcon className="h-10 w-10" />
                            <p className="text-lg font-semibold">Draw</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <FlagIcon className="h-10 w-10" />
                            <p className="text-lg font-semibold">Resign</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardSidebar;
