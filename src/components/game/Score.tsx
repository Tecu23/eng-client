import { useChess } from "@/context/ChessContext";

const Score = () => {
    const { gameSettings } = useChess();

    return (
        <div className="flex items-center gap-4 text-lg font-bold">
            <div className="flex gap-1 text-emerald-500">
                <div className="">W</div>
                <div>{gameSettings.results.wins}</div>
            </div>
            <div className="flex gap-1 text-rose-500">
                <div className="">L</div>
                <div>{gameSettings.results.loses}</div>
            </div>
            <div className="flex gap-1 text-neutral-500">
                <div className="">D</div>
                <div>{gameSettings.results.draws}</div>
            </div>
        </div>
    );
};

export default Score;
