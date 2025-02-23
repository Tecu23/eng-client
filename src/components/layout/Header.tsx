const Header = () => {
    return (
        <header className="w-max-6xl bg-square-light px-2 py-2">
            <div className="flex justify-between">
                <div className="font-mono text-3xl font-bold">Argo</div>
                <nav className="">
                    <ul className="">
                        <li className="flex items-center">
                            <p className="px-2 text-emerald-500">W 0</p>
                            <p className="px-2 text-rose-600">L 0</p>
                            <p className="px-2 text-neutral-500">D 0</p>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
