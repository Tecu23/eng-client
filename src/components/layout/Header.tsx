import { useChess } from "@/context/ChessContext";
import Score from "../game/Score";

const Header = () => {
    return (
        <header className="bg-white/5 px-4">
            <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-2">
                <div className="flex items-center gap-4">
                    <div className="font-mono text-3xl font-bold text-white">Argo</div>
                    <Score />
                </div>
                <nav className="px-4 py-2">
                    <ul className="text-square-light flex items-center gap-3 text-lg font-medium">
                        <li>
                            <a>Home</a>
                        </li>
                        <li>
                            <a>About</a>
                        </li>
                        <li>
                            <a>Docs</a>
                        </li>
                        <li>
                            <a>Profile</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
