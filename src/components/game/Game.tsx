import Board from "@/components/game/Board";
import MoveHistory from "@/components/game/MoveHistory";

import { ChessProvider } from "@/context/ChessContext";
import Evaluation from "./Evaluation";
import Score from "./Score";

function Game() {
    return (
        <ChessProvider>
            <div className="container mx-auto flex justify-between pt-4">
                <button className="rounded-md bg-cyan-500 p-2 text-base font-semibold text-white">New Game</button>
                <Score />
            </div>
            <div className="container mx-auto flex flex-col justify-center gap-4 p-4 lg:flex-row">
                <div className="flex gap-2">
                    <Evaluation />
                    <Board />
                </div>
                <MoveHistory />
            </div>
        </ChessProvider>
    );
}

export default Game;
