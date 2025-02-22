import Board from "@/components/game/Board";
import Profile from "@/components/user/Profile";

import { useChess } from "@/context/ChessContext";

const GameScreen = () => {
  const { capturedBlackPieces, capturedWhitePieces } = useChess();

  return (
    <div className="flex h-full flex-col justify-center gap-2 p-8">
      <Profile
        capturedPieces={capturedBlackPieces}
        color="b"
        name="ArGoX"
        elo="9999"
      />
      <Board />
      <Profile
        capturedPieces={capturedWhitePieces}
        color="w"
        name="Challenger"
        elo="200"
      />
    </div>
  );
};

export default GameScreen;
