import { Color } from "chess.js";

type InboundMessagesPayloadMap = {
    CONNECTED: { connection_id: string };
    GAME_CREATED: {
        game_id: string;
        initial_fen: string;
        white_time: number;
        black_time: number;
        current_turn: Color;
        white_increment: number;
        black_increment: number;
    };
    GAME_OVER: { game_id: string; result: string };
    ENGINE_MOVE: { game_id: string; move: string };
    GAME_STATE: {
        game_id: string;
        board_fen: string;
        white_time: number;
        black_time: number;
        current_turn: Color;
        white_increment: number;
        black_increment: number;
    };
    CLOCK_UPDATE: { color: Color; remaining: number };
    ERROR: { message: string };
};

export type InboundMessage = {
    [K in keyof InboundMessagesPayloadMap]: {
        event: K;
        payload: InboundMessagesPayloadMap[K];
    };
}[keyof InboundMessagesPayloadMap];
