import { useAppContext } from "../../app-context";
import styles from './home.module.css';
import JoinRoomModal from "./join-room-modal";
import { useState } from "react";
import socket from "../../helpers/socket";


const Home = () => {
    const { game: { roomId }, dispatchers: { setPlayerName, setPlayerType } } = useAppContext();
    const [openJoinRoomModal, setOpenJoinRoomModal] = useState(false);
    const [userName, setUserName] = useState("");

    const newGame = () => {
        if (userName && !userName.trim().length) {
            alert('Please enter your name.');
            return;
        }
        setPlayerName(userName);
        console.log('emiting createGame');
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

    return <div className={styles.loginContainer}>
        <h2 className={styles.gameTitle}>Black Hole Game</h2>
        <ul className={styles.gameRules}>
            <li>Black Hole is a two-player strategy game where each player starts with 10 tiles numbered 1 through 10. </li>
            <li>The number on the tiles represent both their values and the order in which they are placed onto a triangular board. </li>
            <li>The board has 21 spaces so one space remains uncovered. </li>
            <li> Once all the tiles have been placed, the tiles that surround the empty space are sucked into the black hole. </li>
            <li>The objective of the game is to have fewer points sucked into the black hole (so you have the higher overall score remaining on the board) than the other player.</li>
        </ul>
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
};

export default Home;
