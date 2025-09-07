import { useAppContext } from "../../app-context";
import JoinRoomModal from "../join-room-modal.js/join-room-modal";
import { useState } from "react";
import socket from "../../helpers/socket";
import styles from "./form.module.css"


const LoginForm = () => {
    const { game: { roomId }, dispatchers: { setPlayerName, setPlayerType } } = useAppContext();
    const [openJoinRoomModal, setOpenJoinRoomModal] = useState(false);
    const [userName, setUserName] = useState("");

    const newGame = () => {
        if (userName && !userName.trim().length) {
            alert('Please enter your name.');
            return;
        }
        setPlayerName(userName);
        socket.emit('createGame', { name: userName });
    }

    const openRoomDialog = () => {
        if (userName && !userName.trim().length) {
            alert('Please enter your name.');
            return;
        }
        setOpenJoinRoomModal(true);
    };

    const joinGame = () => {
        setOpenJoinRoomModal(false);
        if (!roomId) {
            alert('Please enter your name and game ID.');
            return;
        }
        setPlayerName(userName);
        setPlayerType("P2");
        socket.emit('joinGame', { name: userName, room: roomId });
    };

    return <div>
        <div className={styles.loginForm}>
            <input
                className={styles.nameInput}
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required />
            <div className={styles.buttonContainer}>
                <button onClick={newGame} className={styles.newGameButton}>New Game</button>
                <button onClick={openRoomDialog} className={styles.joinGameButton}>Join Game</button>
            </div>
        </div>
        {openJoinRoomModal && <JoinRoomModal
            onClose={() => setOpenJoinRoomModal(false)}
            onJoinGame={joinGame}>
        </JoinRoomModal>
        }
    </div>
}

export default LoginForm