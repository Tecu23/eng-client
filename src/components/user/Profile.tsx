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

    return (
        <>
            <div className="flex items-center gap-2 px-4 py-2">
                <div className="flex h-12 w-24 items-center justify-center rounded-md bg-green-200">
                    <p className="font-mono text-xl font-semibold">10:00</p>
                </div>
                <div className="h-16 w-16 flex-auto flex-shrink-0 flex-grow-0 lg:h-24 lg:w-24">
                    <img src={"pieces/rook_b.svg"} alt="computer_profile" className="h-full w-full" />
                </div>
                <div className="flex h-16 flex-shrink flex-grow flex-col">
                    <div className="flex items-center gap-2">
                        <p className="text-piece text-base font-semibold">{name}</p>
                        <p className="text-piece text-base font-semibold">({elo})</p>
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

                                                backgroundImage: `url(${`pieces/rook_${color}.svg`})`,
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
        </>
    );
};

export default Profile;
