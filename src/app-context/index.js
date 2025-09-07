import { createContext, useReducer, useContext, useMemo } from "react";
import { rootReducer, initialState } from "./reducers";
import { setCanStartGame, setShowBoard, setScoreMessage } from "./actions/app";
import { setPlayerName, setPlayerType, setPlayerTurn } from "./actions/player";
import { setRoomId, setFirstPlayerCount, setSecondPlayerCount, setScore, setWinner } from "./actions/game";

const AppContext = createContext(null)
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);

    const dispatchers = useMemo(() => ({
        setShowBoard: setShowBoard(dispatch),
        setCanStartGame: setCanStartGame(dispatch),
        setScoreMessage: setScoreMessage(dispatch),
        setPlayerName: setPlayerName(dispatch),
        setPlayerType: setPlayerType(dispatch),
        setPlayerTurn: setPlayerTurn(dispatch),
        setRoomId: setRoomId(dispatch),
        setFirstPlayerCount: setFirstPlayerCount(dispatch),
        setSecondPlayerCount: setSecondPlayerCount(dispatch),
        setScore: setScore(dispatch),
        setWinner: setWinner(dispatch)
    }), [])

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