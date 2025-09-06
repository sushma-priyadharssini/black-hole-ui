import styles from './board.module.css';
import { useAppContext } from "../../app-context";
import socket from "../../helpers/socket";

const baseCount = 6; // bottom row has 6 squares

const Board = ({ message }) => {
    const { game: { roomId }, dispatchers: { setPlayerTurn } } = useAppContext();
    const rows = Array.from({ length: baseCount }, (_, i) => baseCount - i);

    const resetGame = () => {
        socket.emit('resetGame', { room: roomId });
        //   game.resetGame(); TODO: RESET logic
        setPlayerTurn(true);
    }

    return <div className={styles.boardContainer}>
        <div className={styles.message}>Board Component: {message}</div>
        <div className={styles.board}>
            {rows.reverse().map((count, rowIndex) => (
                <div key={rowIndex} className={styles.boardRow}>
                    {Array.from({ length: count }).map((_, colIndex) => (
                        <div
                            key={colIndex}
                            className={styles.boardCell}
                        />
                    ))}
                </div>
            ))}
        </div>
        <button onClick={resetGame} className={styles.resetButton}>Reset</button>
    </div>
};

export default Board;