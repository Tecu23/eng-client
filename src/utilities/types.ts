import type { Dispatch } from "react";

import type { Chess, Move, PieceSymbol, Square, Color } from "chess.js";

export interface PieceType {
  type: string;
  color: string;
}

export interface ChessContextValue {
  chess: Chess;
  possibleMoves: Move[];

  moveHistory: Move[];
  addToHistory: (move: Move) => void;

  setPossibleMoves: Dispatch<React.SetStateAction<Array<Move>>>;
  isAtTheTop: (arg: Square) => boolean;
  isAtTheBottom: (arg: Square) => boolean;

  capturedBlackPieces: PieceSymbol[];
  capturedWhitePieces: PieceSymbol[];

  capturePiece: (piece: PieceSymbol, color: Color) => void;
}
