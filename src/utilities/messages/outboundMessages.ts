import { Color } from "chess.js";

// Outbound Messages from Client To Server
type OutboundMessagesPayloadMap = {
    CREATE_SESSION: {
        time_control: {
            white_time: number;
            black_time: number;
            white_increment: number;
            black_increment: number;
        };
        color: Color;
        initial_fen: string;
    };
    MAKE_MOVE: { game_id: string; move: string };
};

export type OutboundMessage = {
    [K in keyof OutboundMessagesPayloadMap]: {
        event: K;
        payload: OutboundMessagesPayloadMap[K];
    };
}[keyof OutboundMessagesPayloadMap];
