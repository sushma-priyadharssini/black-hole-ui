import styles from './board.module.css';
import { useAppContext } from "../../app-context";
import socket from "../../helpers/socket";
import { STATUS, STATUS_COLOR } from "../../helpers/constants"

const Board = ({ message, updateBoard, board }) => {
    const {
        app: { canStartGame },
        game: { roomId },
        player: { playerType, playerTurn },
        dispatchers: { setPlayerTurn } } = useAppContext();

    const resetGame = () => {
        socket.emit('resetGame', { room: roomId });
        //   game.resetGame(); TODO: RESET logic
        setPlayerTurn(true);
    }

    const playTurn = (tile, room) => { // Emit an event to update other player that you've played your turn.
        socket.emit('playTurn', { tile, room });
    };

    const markClicked = (status, tile) => {
        if (!canStartGame) {
            alert('Wait for the Opponent to Join');
            return;
        }
        if (!playerTurn) {
            alert('Its not your turn!');
            return;
        } else if (status === STATUS.DEFAULT) {
            playTurn(tile, roomId);
            updateBoard(playerType, tile);
            setPlayerTurn(false);
        } else {
            alert('Already played!');
        }
    }

    return <div className={styles.boardContainer}>
        <div className={styles.message}>{message}</div>
        <div className={styles.board}>
            {board?.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.boardRow}>
                    {row.map((block, colIndex) => {
                        const { text, status } = block;
                        return (
                            <div
                                key={colIndex}
                                onClick={() => markClicked(status, [rowIndex, colIndex])}
                                className={`${styles.boardCell}`}
                                style={{ backgroundColor: STATUS_COLOR[status] }}
                            >
                                {text}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
        <button onClick={resetGame} className={styles.resetButton}>Reset</button>
    </div>
};

export default Board;