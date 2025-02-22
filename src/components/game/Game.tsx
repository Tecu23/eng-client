import Board from "@/components/game/Board";
import MoveHistory from "@/components/game/MoveHistory";

import { ChessProvider } from "@/context/ChessContext";
import Evaluation from "./Evaluation";

function Game() {
    return (
        <ChessProvider>
            <div className="container mx-auto flex max-w-6xl gap-4">
                <Evaluation />
                <Board />
                <MoveHistory />
            </div>
        </ChessProvider>
    );
}

export default Game;
