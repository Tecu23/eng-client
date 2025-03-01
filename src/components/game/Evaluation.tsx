type Props = {
    value: number;
};
const Evaluation = ({ value }: Props) => {
    return (
        <div className="h-full w-10 rounded-sm border">
            <div className="bg-square-dark rouned-t-md h-1/2 w-full">
                <div className="text-piece text-center text-lg font-bold">{value.toFixed(1)}</div>
            </div>
            <div className="bg-square-light flex h-1/2 w-full items-end justify-center rounded-b-md">
                <div className="text-piece text-center text-lg font-bold">{value.toFixed(1)}</div>
            </div>
        </div>
    );
};

export default Evaluation;
