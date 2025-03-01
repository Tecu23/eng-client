import Profile from "@/components/user/Profile";

import { useChess } from "@/context/ChessContext";
import {
    AdjustmentsHorizontalIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ScaleIcon,
} from "@heroicons/react/20/solid";
import { FlagIcon } from "@heroicons/react/24/outline";

const MoveHistory = () => {
    const { gameSettings, capturedBlackPieces, capturedWhitePieces } = useChess();

    return (
        <div className="bg-square-light/50 w-full min-w-60 flex-grow lg:max-w-xl">
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
            <div className="flex h-8 w-full items-center justify-around border">
                <ChevronLeftIcon className="h-8 w-8" />
                <ChevronDoubleLeftIcon className="h-8 w-8" />
                <ChevronDoubleRightIcon className="h-8 w-8" />
                <ChevronRightIcon className="h-8 w-8" />
                <AdjustmentsHorizontalIcon className="h-8 w-8" />
            </div>
            <div className="flex h-52 flex-col bg-white">
                <div className="flex flex-row gap-12 px-2 py-1">
                    <p>1.</p>
                    <div className="flex items-center">
                        <img src="pieces/pawn_w.svg" className="h-4 w-4" />
                        <p className="font-semibold">c3</p>
                    </div>
                    <div className="flex items-center">
                        <img src="pieces/knight_b.svg" className="h-4 w-4" />
                        <p className="font-semibold">f6</p>
                    </div>
                </div>
                <div className="bg-square-light flex flex-row gap-12 px-2 py-1">
                    <p>2.</p>
                    <div className="flex items-center">
                        <img src="pieces/queen_w.svg" className="h-4 w-4" />
                        <p className="font-semibold">c2</p>
                    </div>
                    <div className="flex items-center">
                        <img src="pieces/pawn_b.svg" className="h-4 w-4" />
                        <p className="font-semibold">d5</p>
                    </div>
                </div>
                <div className="flex flex-row gap-12 px-2 py-1">
                    <p>1.</p>
                    <div className="flex items-center">
                        <img src="pieces/pawn_w.svg" className="h-4 w-4" />
                        <p className="font-semibold">e3</p>
                    </div>
                    <div className="flex items-center">
                        <img src="pieces/knight_b.svg" className="h-4 w-4" />
                        <p className="font-semibold">e4</p>
                    </div>
                </div>
                <div className="bg-square-light flex flex-row gap-12 px-2 py-1">
                    <p>1.</p>
                    <div className="flex items-center">
                        <img src="pieces/king_w.svg" className="h-4 w-4" />
                        <p className="font-semibold">e2</p>
                    </div>
                    <div className="flex items-center">
                        <img src="pieces/pawn_b.svg" className="h-4 w-4" />
                        <p className="font-semibold">e5</p>
                    </div>
                </div>
            </div>
            <div className="flex h-8 items-center gap-3 px-4">
                <ScaleIcon className="h-8 w-8" />
                <p>Draw</p>
                <FlagIcon className="h-8 w-8" />
                <p>Abort</p>
            </div>
        </div>
    );
};

export default MoveHistory;
