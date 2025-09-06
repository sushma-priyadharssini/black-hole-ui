
import { useEffect, useState } from "react";
import { useAppContext } from "../app-context";
import socket from "../helpers/socket";


const useSocket = () => {
    const {
        player: { name, type },
        dispatchers: {
            setShowBoard,
            setPlayerTurn,
            setCanStartGame,
            setRoomId } } = useAppContext();
    const [message, setMessage] = useState('');

    useEffect(() => {
        // New Game created by current client. Update the UI and create new Game var.
        socket.on('newGame', (data) => {
            const message = `Hello, ${data.name}. Please ask your friend to enter Game ID: ${data.room}. Waiting for player 2...`;
            setRoomId(data.room); // Create game for player 1
            setShowBoard(true);
            setMessage(message);
        });

        //Update UI for player 1 after player 2 has joined game
        socket.on('player1', () => {
            console.log('player1 event received');
            const message = `Hello, ${name}`;
            setMessage(message);
            setPlayerTurn(true);
            setCanStartGame(true);
        });

        //Update UI for player 2
        socket.on('player2', (data) => {
            console.log('player2 event received');
            const message = `Hello, ${data.name}`;
            setRoomId(data.room); // Create game for player 2
            setMessage(message);
            setPlayerTurn(false);
            setCanStartGame(true);
        });

        //Opponent played his turn. Update UI. Allow the current player to play now.
        socket.on('turnPlayed', (data) => {
            const opponentType = type === 'P1' ? 'P2' : 'P1';
            // game.updateBoard(opponentType, data.tile);
            setPlayerTurn(true);
        });

        //Notify the winner and score to the first player
        socket.on('winnerDeclared', (data) => {
            // game.displayScore(player.getPlayerType(), data.winner, data.score);
        });

        //reset Game board for the opponent.
        socket.on('resetGameBoard', () => {
            // game.resetGame();
            setPlayerTurn(false);
        });

        //reset Game board for the opponent.
        socket.on('err', (data) => {
            alert(data.message);
        });


        // Cleanup to prevent multiple listeners
        return () => {
            socket.off("newGame");
            socket.off("player1");
            socket.off("player2");
            socket.off("turnPlayed");
            socket.off("winnerDeclared");
            socket.off("resetGameBoard");
        };
    }, [name, type, setCanStartGame, setPlayerTurn, setRoomId, setShowBoard]);

    return { message };
}

export default useSocket;