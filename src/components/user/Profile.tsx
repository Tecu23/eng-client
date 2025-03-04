import { Color } from "chess.js";

type Props = {
    capturedPieces: string[];
    color: Color;
    name: string;
    time: number;
    elo: string;
};
const Profile = ({ capturedPieces, color, name, time, elo }: Props) => {
    const pawns = capturedPieces.filter((p) => p.toLowerCase() === "p");
    const bishops = capturedPieces.filter((p) => p.toLowerCase() === "b");
    const rooks = capturedPieces.filter((p) => p.toLowerCase() === "r");
    const queens = capturedPieces.filter((p) => p.toLowerCase() === "q");
    const knights = capturedPieces.filter((p) => p.toLowerCase() === "q");

    const formatTime = (ms: number) => {
        const totalSec = Math.floor(ms / 1000);
        const mins = Math.floor(totalSec / 60);
        const sec = totalSec % 60;

        return `${mins}:${sec.toString().padStart(2, "0")}`;
    };

    return (
        <>
            <div
                className={`flex ${color == "w" ? "bg-white" : "bg-piece"} h-20 flex-shrink-0 flex-grow-0 items-center gap-2 rounded-md px-4 py-2`}
            >
                <div className="flex h-12 w-24 items-center justify-center rounded-md bg-green-300">
                    <p className="font-mono text-xl font-semibold">
                        {time == 0 ? formatTime(300_000) : formatTime(time)}
                    </p>
                </div>
                <div className="h-16 w-16 flex-auto flex-shrink-0 flex-grow-0">
                    <img src={`pieces/rook_${color}.svg`} alt="computer_profile" className="h-full w-full" />
                </div>
                <div className="flex h-16 flex-shrink flex-grow flex-col">
                    <div className={`flex ${color == "w" ? "text-piece" : "text-square-light"} items-center gap-2`}>
                        <p className={`text-base font-semibold`}>{name}</p>
                        <p className="text-base font-semibold">({elo})</p>
                    </div>
                    <div className="relative flex flex-shrink flex-grow items-center justify-start">
                        <div
                            style={{
                                width: pawns.length == 0 ? 0 : 30 + (pawns.length - 1) * 10 + 5,
                            }}
                            className="relative h-full"
                        >
                            {pawns.map((piece, idx) => {
                                return (
                                    <div
                                        key={piece + idx}
                                        className="absolute top-1/2 flex h-8 w-8 -translate-y-1/2 transform"
                                        style={{ left: 10 * idx - 5 }}
                                    >
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",

                                                backgroundImage: `url(${`pieces/pawn_${color == "w" ? "b" : "w"}.svg`})`,
                                                backgroundSize: "cover",
                                                backgroundRepeat: "no-repeat",
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div
                            style={{
                                width: knights.length == 0 ? 0 : 30 + (knights.length - 1) * 12 + 5,
                            }}
                            className="relative h-full"
                        >
                            {knights.map((piece, idx) => {
                                return (
                                    <div
                                        key={piece + idx}
                                        className="absolute top-1/2 flex h-8 w-8 -translate-y-1/2 transform"
                                        style={{ left: 12 * idx - 5 }}
                                    >
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",

                                                backgroundImage: `url(${`pieces/knight_${color == "w" ? "b" : "w"}.svg`})`,
                                                backgroundSize: "cover",
                                                backgroundRepeat: "no-repeat",
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div
                            style={{
                                width: bishops.length == 0 ? 0 : 30 + (bishops.length - 1) * 10 + 5,
                            }}
                            className="relative h-full"
                        >
                            {bishops.map((piece, idx) => {
                                return (
                                    <div
                                        key={piece + idx}
                                        className="absolute top-1/2 h-8 w-8 -translate-y-1/2 transform"
                                        style={{ left: 10 * idx - 5 }}
                                    >
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",

                                                backgroundImage: `url(${`pieces/bishop_${color == "w" ? "b" : "w"}.svg`})`,
                                                backgroundSize: "cover",
                                                backgroundRepeat: "no-repeat",
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div
                            style={{
                                width: rooks.length == 0 ? 0 : 30 + (rooks.length - 1) * 10 + 5,
                            }}
                            className="relative h-full"
                        >
                            {rooks.map((piece, idx) => {
                                return (
                                    <div
                                        key={piece + idx}
                                        className="absolute top-1/2 flex h-8 w-8 -translate-y-1/2 transform"
                                        style={{ left: 10 * idx - 5 }}
                                    >
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",

                                                backgroundImage: `url(${`pieces/rook_${color == "w" ? "b" : "w"}.svg`})`,
                                                backgroundSize: "cover",
                                                backgroundRepeat: "no-repeat",
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="relative h-full">
                            {queens.map((piece, idx) => {
                                return (
                                    <div
                                        key={piece + idx}
                                        className="absolute top-1/2 flex h-8 w-8 -translate-y-1/2 transform"
                                        style={{ left: 12 * idx - 5 }}
                                    >
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",

                                                backgroundImage: `url(${`pieces/queen_${color == "w" ? "b" : "w"}.svg`})`,
                                                backgroundSize: "cover",
                                                backgroundRepeat: "no-repeat",
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
