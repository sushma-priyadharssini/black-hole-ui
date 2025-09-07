
import { useEffect, useState, useCallback } from "react";
import { useAppContext } from "../app-context";
import socket from "../helpers/socket";
import { getScoreBoardMessage, initializeBoard, findBlackHole } from "../helpers/utils";

const useSocket = () => {
    const {
        player: { playerName, playerType },
        game: { firstPlayerCount, secondPlayerCount },
        app: { board },
        dispatchers: {
            setShowBoard,
            setPlayerTurn,
            setCanStartGame,
            setRoomId,
            setScoreMessage,
            setBoard,
            setFirstPlayerCount,
            setSecondPlayerCount
        } } = useAppContext();
    const [message, setMessage] = useState('');


    // update context state of the board
    const setBoardState = useCallback((tile, updatedBlock) => {
        const updatedBoard = board.map((row, r) =>
            r === tile[0]
                ? row.map((block, c) => (c === tile[1] ? updatedBlock : block))
                : row
        )
        setBoard(updatedBoard);
    }, [board, setBoard])

    // calculate scores and decide the winner
    const getWinner = useCallback(() => {
        let blackHoleTile = findBlackHole(board);
        setBoardState(blackHoleTile, { text: "??", color: "black" })
        // var neighbours = this.getNeighbours(blackHole);
        // this.getScore(neighbours);
    }, [board, setBoardState])

    // update the board for the given tile
    const updateBoard = useCallback((playerType, tile) => {
        if (firstPlayerCount === 11 && secondPlayerCount === 11) {
            return;
        }
        if (playerType === 'P1') {
            setBoardState(tile, { text: firstPlayerCount, color: '#9090D6' })
            setFirstPlayerCount(firstPlayerCount + 1);
        } else {
            setBoardState(tile, { text: secondPlayerCount, color: '#F43F5E' })
            setSecondPlayerCount(secondPlayerCount + 1);
        }
        if (firstPlayerCount + 1 > 10 && secondPlayerCount + 1 > 10) {
            getWinner();
        }
    }, [firstPlayerCount, secondPlayerCount, setBoardState, getWinner, setFirstPlayerCount, setSecondPlayerCount])

    // display the score in the UI
    const displayScore = useCallback((winner, score) => {
        const scoreMessage = getScoreBoardMessage(playerType, winner, score);
        setScoreMessage(scoreMessage);
    }, [playerType, setScoreMessage])



    // SOCKET LISTENERS

    useEffect(() => {
        // New Game created by current client. Update the UI and create new Game var.
        socket.on('newGame', (data) => {
            const message = `Hello, ${data.name}. Please ask your friend to enter Game ID: ${data.room}. Waiting for player 2...`;
            setRoomId(data.room); // Create game for player 1
            setBoard(initializeBoard());
            setShowBoard(true);
            setMessage(message);
        });

        //Update UI for player 1 after player 2 has joined game
        socket.on('player1', () => {
            const message = `Hello, ${playerName}`;
            setMessage(message);
            setPlayerTurn(true);
            setCanStartGame(true);
        });

        //Update UI for player 2
        socket.on('player2', (data) => {
            const message = `Hello, ${data.name}`;
            setRoomId(data.room); // Create game for player 2
            setMessage(message);
            setPlayerTurn(false);
            setCanStartGame(true);
            setBoard(initializeBoard());
            setShowBoard(true);
        });

        //Opponent played his turn. Update UI. Allow the current player to play now.
        socket.on('turnPlayed', (data) => {
            const opponentType = playerType === 'P1' ? 'P2' : 'P1';
            updateBoard(opponentType, data.tile);
            setPlayerTurn(true);
        });

        //Notify the winner and score to the first player
        socket.on('winnerDeclared', (data) => {
            displayScore(data.winner, data.score);
        });

        //reset Game board for the opponent.
        socket.on('resetGameBoard', () => {
            // game.resetGame();
            setPlayerTurn(false);
        });

        //reset Game board for the opponent.
        socket.on('err', (data) => {
            if (data.type === "room") {
                setRoomId(null)
                alert(data.message);
            }
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
    }, [playerName,
        playerType,
        board,
        displayScore,
        setBoard,
        setCanStartGame,
        setPlayerTurn,
        setRoomId,
        setShowBoard,
        updateBoard
    ]);

    return { message, updateBoard, displayScore };
}

export default useSocket;