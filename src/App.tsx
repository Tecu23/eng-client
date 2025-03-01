import Game from "@/components/game/Game";
import Header from "@/components/layout/Header";
import PopUp from "@/components/standalone/PopUp";
import { ChessProvider } from "@/context/ChessContext";

import { usePopUp } from "@/context/PopUpContext";

const App = () => {
    const { open } = usePopUp();
    return (
        <main className="bg-piece relative min-h-screen">
            <Header />
            <ChessProvider>
                <Game />
            </ChessProvider>
            {open && <PopUp />}
        </main>
    );
};

export default App;
