import Home from "../home/home"
import Board from "../board/board";
import styles from "./game.module.css"
import { useAppContext } from "../../app-context";
import useSocket from "../../hooks/useSocket";


const Game = () => {
    const { board, message, updateBoard } = useSocket();
    const { app: { showBoard, scoreMessage } } = useAppContext();

    return <div className={styles.gameContainer}>
        {!showBoard && <Home />}
        {showBoard && <Board
            board={board}
            updateBoard={updateBoard}
            message={message} />}
        {scoreMessage && <div className={styles.scoreMessage}>{scoreMessage}</div>}
    </div>
};

export default Game;
