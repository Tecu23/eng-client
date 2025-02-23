// Outbound Messages from Client To Server
type OutboundMessagesPayloadMap = {
    create_session: {
        time_control: { white_time: number; black_time: number; white_increment: number; black_increment: number };
        color: string;
    };
    make_move: { game_session: string };
};

export type OutboundMessage = {
    [K in keyof OutboundMessagesPayloadMap]: {
        event: K;
        payload: OutboundMessagesPayloadMap[K];
    };
}[keyof OutboundMessagesPayloadMap];
