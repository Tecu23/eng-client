import { Color } from "chess.js";

type InboundMessagesPayloadMap = {
    CONNECTED: { connectionId: string };
    GAME_CREATED: { game_id: string; initial_fen: string; white_time: number; black_time: number; current_turn: Color };
    TIME_UPDATE: { color: Color; remaining: number };
};

export type InboundMessage = {
    [K in keyof InboundMessagesPayloadMap]: {
        event: K;
        payload: InboundMessagesPayloadMap[K];
    };
}[keyof InboundMessagesPayloadMap];
