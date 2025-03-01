import Board from "@/components/game/Board";
import Score from "@/components/game/Score";
import Evaluation from "@/components/game/Evaluation";
import BoardSidebar from "@/components/game/BoardSidebar";

import { InboundMessage } from "src/utilities/messages/inboundMessages";
import { OutboundMessage } from "src/utilities/messages/outboundMessages";

import useWebsocket from "@/hooks/useWebSocket";

import { useChess } from "@/context/ChessContext";
import { usePopUp } from "@/context/PopUpContext";
import { StartPosition } from "@/constants/board";

import notifySound from "@/assets/sounds/notify.mp3";

function Game() {
    const notifyAudio = new Audio(notifySound);

    const { triggerPopUp } = usePopUp();

    const { updateTime, gameMode, gameSettings, updateGameSettings, makeEngineMove } = useChess();

    const { sendMessage, isConnected } = useWebsocket(
        import.meta.env.VITE_WEBSOCKET_PATH || "ws://localhost:8080/ws",
        handleMessages,
    );

    function handleMessages(message: InboundMessage) {
        switch (message.event) {
            case "CONNECTED":
                triggerPopUp({
                    header: "Connection Established",
                    body: `Websocket connected with ID: ${message.payload.connection_id}`,
                });
                break;
            case "GAME_STATE":
                updateGameSettings({
                    id: message.payload.game_id,
                    fen: message.payload.board_fen,
                    whiteTime: message.payload.white_time,
                    blackTime: message.payload.black_time,
                    whiteIncrement: message.payload.white_increment,
                    blackIncrement: message.payload.black_increment,
                });
                break;
            case "GAME_CREATED":
                updateGameSettings({
                    id: message.payload.game_id,
                    fen: message.payload.initial_fen,
                    whiteTime: message.payload.white_time,
                    blackTime: message.payload.black_time,
                    whiteIncrement: message.payload.white_increment,
                    blackIncrement: message.payload.black_increment,
                });
                notifyAudio.play();
                break;
            case "GAME_OVER":
                break;
            case "ENGINE_MOVE":
                makeEngineMove(message.payload.move);
                break;
            case "CLOCK_UPDATE":
                updateTime(message.payload.remaining, message.payload.color);
                break;
            case "ERROR":
                triggerPopUp({
                    header: "Error",
                    body: `${message.payload.message}`,
                });
                break;
            default:
                break;
        }
    }

    const makePlayerMove = (move: string) => {
        if (gameSettings.id) {
            const message: OutboundMessage = { event: "MAKE_MOVE", payload: { game_id: gameSettings.id, move: move } };
            sendMessage(message);
        }
    };

    return (
        <>
            <div className="container mx-auto flex justify-between pt-4">
                <button
                    onClick={() => {
                        if (isConnected) {
                            const message: OutboundMessage = {
                                event: "CREATE_SESSION",
                                payload: {
                                    color: "w",
                                    time_control: {
                                        white_time: 300_000,
                                        black_time: 300_000,
                                        white_increment: 0,
                                        black_increment: 0,
                                    },
                                    initial_fen: StartPosition,
                                },
                            };

                            sendMessage(message);
                        }
                    }}
                    className="cursor-pointer rounded-md bg-cyan-500 p-2 text-base font-semibold text-white"
                >
                    New Game
                </button>
                <Score />
            </div>
            <div className="container mx-auto grid h-full w-full justify-items-center gap-4 p-4 lg:grid-cols-2">
                <div
                    style={{
                        gridTemplateColumns: gameMode == "play" ? "1fr" : "3rem 1fr",
                    }}
                    className="grid w-full max-w-4xl flex-shrink flex-grow"
                >
                    {gameMode == "analysis" ? <Evaluation value={0.0} /> : null}
                    <Board makePlayerMove={makePlayerMove} />
                </div>
                <BoardSidebar />
            </div>
        </>
    );
}

export default Game;
