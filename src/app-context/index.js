import { createContext, useReducer, useContext } from "react";
import { rootReducer, initialState } from "./reducers";
import { setCanStartGame, setShowBoard } from "./actions/app";
import { setPlayerName, setPlayerType, setPlayerTurn } from "./actions/player";
import { setRoomId, setFirstPlayerCount, setSecondPlayerCount } from "./actions/game";

const AppContext = createContext(null)
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);

    const dispatchers = {
        setShowBoard: setShowBoard(dispatch),
        setCanStartGame: setCanStartGame(dispatch),
        setPlayerName: setPlayerName(dispatch),
        setPlayerType: setPlayerType(dispatch),
        setPlayerTurn: setPlayerTurn(dispatch),
        setRoomId: setRoomId(dispatch),
        setFirstPlayerCount: setFirstPlayerCount(dispatch),
        setSecondPlayerCount: setSecondPlayerCount(dispatch),
    }

    return (
        <AppContext.Provider value={{
            app: state.app,
            player: state.player,
            game: state.game,
            dispatchers
        }}>
            {children}
        </AppContext.Provider>
    );
}