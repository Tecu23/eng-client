const Score = () => {
    return (
        <div className="flex items-center gap-4">
            <div className="flex gap-1 text-2xl font-bold text-green-600">
                <div className="">W</div>
                <div>0</div>
            </div>
            <div className="flex gap-1 text-2xl font-bold text-red-600">
                <div className="">L</div>
                <div>0</div>
            </div>
            <div className="flex gap-1 text-2xl font-bold text-neutral-600">
                <div className="">D</div>
                <div>0</div>
            </div>
        </div>
    );
};

export default Score;
