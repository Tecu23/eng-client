import { useState, useEffect, useRef } from "react";

import { OutboundMessage } from "../messages/outboundMessages";
import { InboundMessage } from "../messages/inboundMessages";

interface useWebSocketReturn {
    sendMessage: (message: OutboundMessage) => void;
    isConnected: boolean;
}

const useWebsocket = (url: string, callback: (m: InboundMessage) => void): useWebSocketReturn => {
    const [isConnected, setIsConnected] = useState(false);
    const webSocketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(url);

        webSocketRef.current = ws;

        ws.onopen = () => {
            setIsConnected(true);
            console.log("Websocket connected");
        };

        ws.onmessage = (e) => {
            const message: InboundMessage = JSON.parse(e.data);
            console.log("Message from server:", message);

            // Handle incoming messages here
            callback(message);
        };

        ws.onclose = () => {
            setIsConnected(false);
            console.log("Websocket disconnected");
        };

        ws.onerror = (err) => {
            console.log("Websocket error: ", err);
        };

        return () => {
            ws.close();
        };
    }, [url]);

    const sendMessage = (message: OutboundMessage) => {
        if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
            webSocketRef.current.send(JSON.stringify(message));
        }
    };

    return { sendMessage, isConnected };
};

export default useWebsocket;
