import GameScreen from "@/components/game/GameScreen";

import { ChessProvider } from "@/context/ChessContext";

// import MoveHistory from "./MoveHistory";

function Game() {
    return (
        <ChessProvider>
            <div className="container mx-auto h-screen w-full max-w-7xl p-8 lg:flex lg:flex-row-reverse lg:items-center lg:gap-24">
                {/* <MoveHistory /> */}
                <GameScreen />
            </div>
        </ChessProvider>
    );
}

export default Game;
