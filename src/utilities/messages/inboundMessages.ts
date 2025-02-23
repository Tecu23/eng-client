type InboundMessagesPayloadMap = {
    connected: { connectionId: string };
    game_created: { fen: string };
};

export type InboundMessage = {
    [K in keyof InboundMessagesPayloadMap]: {
        event: K;
        payload: InboundMessagesPayloadMap[K];
    };
}[keyof InboundMessagesPayloadMap];
