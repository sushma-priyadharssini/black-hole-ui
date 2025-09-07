import styles from './board.module.css';
import { useAppContext } from "../../app-context";
import socket from "../../helpers/socket";

const Board = ({ message, updateBoard, displayScore }) => {
    const {
        app: { canStartGame, board },
        game: { roomId, winner, score },
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

    const markClicked = (text, tile) => {
        if (!canStartGame) {
            alert('Wait for the Opponent to Join');
            return;
        }
        if (!playerTurn) {
            alert('Its not your turn!');
            return;
        } else if (text === '?') {
            playTurn(tile, roomId);
            updateBoard(playerType, tile);
            if (winner) {
                socket.emit('declareWinner', { room: roomId, winner: winner, score: score });
                displayScore(winner, score);
            }
            setPlayerTurn(false);
        }
    }

    return <div className={styles.boardContainer}>
        <div className={styles.message}>{message}</div>
        <div className={styles.board}>
            {board?.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.boardRow}>
                    {row.map((block, colIndex) => {
                        const { text, color } = block;
                        return (
                            <div
                                key={colIndex}
                                onClick={() => markClicked(text, [rowIndex, colIndex])}
                                className={`${styles.boardCell}`}
                                style={{ backgroundColor: color }}
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