import Board from "@/components/game/Board";
import MoveHistory from "@/components/game/MoveHistory";

import { ChessProvider } from "@/context/ChessContext";
import Evaluation from "./Evaluation";

function Game() {
    return (
        <ChessProvider>
            <div className="container mx-auto my-auto flex flex-col gap-2 lg:flex-row">
                <div className="flex justify-around gap-2">
                    <Evaluation />
                    <Board />
                </div>
                <div className="">
                    <MoveHistory />
                </div>
            </div>
        </ChessProvider>
    );
}

export default Game;
