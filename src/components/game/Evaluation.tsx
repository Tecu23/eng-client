const Evaluation = () => {
    return (
        <div className="h-[544px] w-10 flex-shrink-0 flex-grow-0 rounded-sm border">
            <div className="bg-piece rouned-t-md h-1/2 w-full">
                <div className="text-square-light text-center">0.0</div>
            </div>
            <div className="bg-square-light flex h-1/2 w-full items-end justify-center rounded-b-md">
                <div className="text-piece text-center">0.0</div>
            </div>
        </div>
    );
};

export default Evaluation;
