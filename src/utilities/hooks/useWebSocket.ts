import { useState, useEffect, useRef } from "react";

interface WebSocketMessage {
    type: string;
    payload: any;
}

interface useWebSocketReturn {
    sendMessage: (message: WebSocketMessage) => void;
    isConnected: boolean;
}

const useWebsocket = (url: string): useWebSocketReturn => {
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
            const message = JSON.parse(e.data);
            console.log("Message from server:", message);

            // Handle incoming messages here
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

    const sendMessage = (message: WebSocketMessage) => {
        if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
            webSocketRef.current.send(JSON.stringify(message));
        }
    };

    return { sendMessage, isConnected };
};

export default useWebsocket;
