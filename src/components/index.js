import { AppContextProvider } from "../app-context";
import Game from "../components/game/game";


const BlackHole = () => {
    return <AppContextProvider>
        <Game />
    </AppContextProvider>

};

export default BlackHole;
