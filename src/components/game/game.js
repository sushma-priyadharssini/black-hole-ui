import Home from "../home/home"
import Board from "../board/board";
import styles from "./game.module.css"
import { useAppContext } from "../../app-context";
import useSocket from "../../hooks/useSocket";


const Game = () => {
    const { message } = useSocket();
    const { app: { showBoard } } = useAppContext();

    return <div className={styles.gameContainer}>
        {!showBoard && <Home />}
        {showBoard && <Board message={message} />}
    </div>
};

export default Game;
