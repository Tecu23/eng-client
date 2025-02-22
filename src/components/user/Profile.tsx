import { useWindowSize } from "@/hooks/useWindowSize";

type Props = {
    capturedPieces: string[];
    color: "w" | "b";
    name: string;
    elo: string;
};
const Profile = ({ capturedPieces, color, name, elo }: Props) => {
    const pawns = capturedPieces.filter((p) => p.toLowerCase() === "p");
    const bishops = capturedPieces.filter((p) => p.toLowerCase() === "b");
    const rooks = capturedPieces.filter((p) => p.toLowerCase() === "r");
    const queens = capturedPieces.filter((p) => p.toLowerCase() === "q");
    const knights = capturedPieces.filter((p) => p.toLowerCase() === "q");

    const [width, _] = useWindowSize();

    return (
        <div className="flex h-24 w-full items-center justify-between py-4 lg:h-32">
            <div className="flex flex-row items-center gap-4">
                <div className="h-16 w-16 flex-auto flex-shrink-0 flex-grow-0 lg:h-24 lg:w-24">
                    <img src={"pieces/rook_b.svg"} alt="computer_profile" className="h-full w-full" />
                </div>
                <div className="flex h-16 flex-col items-start justify-start gap-2 py-1 lg:h-24">
                    <div className="flex items-center gap-2">
                        <p className="text-piece text-base font-semibold lg:text-2xl">{name}</p>
                        <p className="text-piece text-base font-semibold lg:text-2xl">({elo})</p>
                    </div>
                    <div className="relative flex items-center justify-start">
                        <div
                            style={{
                                minWidth: pawns.length > 0 ? (width < 1024 ? 30 : 50) : 0,
                                width: pawns.length * (width < 1024 ? 16 : 24),
                            }}
                            className="relative h-full"
                        >
                            {pawns.map((piece, idx) => {
                                return (
                                    <div
                                        key={piece + idx}
                                        className="absolute flex h-8 w-8 lg:h-12 lg:w-12"
                                        style={{ left: (width < 1024 ? 10 : 14) * idx - 5, top: 0 }}
                                    >
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",

                                                backgroundImage: `url(${`pieces/pawn_${color}.svg`})`,
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
                                minWidth: knights.length > 0 ? (width < 1024 ? 30 : 50) : 0,
                                width: knights.length * (width < 1024 ? 14 : 26),
                            }}
                            className="relative"
                        >
                            {knights.map((piece, idx) => {
                                return (
                                    <div
                                        key={piece + idx}
                                        className="absolute flex h-8 w-8 lg:h-12 lg:w-12"
                                        style={{ left: (width < 1024 ? 12 : 16) * idx - 5 }}
                                    >
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",

                                                backgroundImage: `url(${`pieces/knight_${color}.svg`})`,
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
                                minWidth: bishops.length > 0 ? (width < 1024 ? 30 : 50) : 0,
                                width: bishops.length * (width < 1024 ? 14 : 26),
                            }}
                            className="relative"
                        >
                            {bishops.map((piece, idx) => {
                                return (
                                    <div
                                        key={piece + idx}
                                        className="absolute flex h-8 w-8 lg:h-12 lg:w-12"
                                        style={{ left: (width < 1024 ? 10 : 16) * idx - 5 }}
                                    >
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",

                                                backgroundImage: `url(${`pieces/bishop_${color}.svg`})`,
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
                                minWidth: rooks.length > 0 ? (width < 1024 ? 30 : 50) : 0,
                                width: rooks.length * (width < 1024 ? 17 : 26),
                            }}
                            className="relative"
                        >
                            {rooks.map((piece, idx) => {
                                return (
                                    <div
                                        key={piece + idx}
                                        className="absolute flex h-8 w-8 lg:h-12 lg:w-12"
                                        style={{ left: (width < 1024 ? 10 : 16) * idx - 5 }}
                                    >
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",

                                                backgroundImage: `url(${`pieces/rook_${color}.svg`})`,
                                                backgroundSize: "cover",
                                                backgroundRepeat: "no-repeat",
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="relative">
                            {queens.map((piece, idx) => {
                                return (
                                    <div
                                        key={piece + idx}
                                        className="absolute flex h-8 w-8 lg:h-12 lg:w-12"
                                        style={{ left: (width < 1024 ? 10 : 18) * idx - 5 }}
                                    >
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",

                                                backgroundImage: `url(${`pieces/queen_${color}.svg`})`,
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
        </div>
    );
};

export default Profile;
