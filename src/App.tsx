import Game from "@/components/game/Game";
import Header from "@/components/layout/Header";
import PopUp from "@/components/standalone/PopUp";

import { usePopUp } from "@/context/PopUpContext";

const App = () => {
    const { open } = usePopUp();
    return (
        <main className="relative">
            <Header />
            <Game />
            {open && <PopUp />}
        </main>
    );
};

export default App;
