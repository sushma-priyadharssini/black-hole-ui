
import { useEffect, useState, useCallback } from "react";
import { useAppContext } from "../app-context";
import socket from "../helpers/socket";
import { getScoreBoardMessage, initializeBoard, findBlackHole, getNeighbours, calculateScore } from "../helpers/utils";
import { STATUS } from "../helpers/constants"

const useSocket = () => {
    const {
        player: { playerName, playerType },
        game: { firstPlayerCount, secondPlayerCount, score, winner, roomId },
        dispatchers: {
            setShowBoard,
            setPlayerTurn,
            setCanStartGame,
            setRoomId,
            setScoreMessage,
            setFirstPlayerCount,
            setSecondPlayerCount,
            setScore,
            setWinner
        } } = useAppContext();
    const [message, setMessage] = useState('');
    const [board, setBoard] = useState(initializeBoard());
    const [blackHole, setblackHole] = useState(null)


    // update context state of the board
    const setBoardState = useCallback((tile, updatedBlock) => {
        setBoard((prev) => {
            return prev.map((row, r) =>
                r === tile[0]
                    ? row.map((block, c) => c === tile[1] ? updatedBlock : block)
                    : row
            )
        });
    }, [setBoard])


    // calculate scores and decide the winner
    const checkWinner = useCallback(() => {
        let blackHoleTile = findBlackHole(board);
        setblackHole(blackHoleTile)
        if (blackHoleTile) {
            setBoardState(blackHoleTile, { text: "??", status: STATUS.BLACK_HOLE })
            let neighbours = getNeighbours(blackHoleTile);
            const gameResults = calculateScore(board, neighbours)
            setScore(gameResults.score);
            setWinner(gameResults.winner)
        }
    }, [board, setBoardState, setScore, setWinner])


    // update the board for the given tile
    const updateBoard = useCallback((playerType, tile) => {
        if (firstPlayerCount === 10 && secondPlayerCount === 10) {
            return;
        }

        if (playerType === 'P1') {
            setBoardState(tile, { text: firstPlayerCount + 1, status: STATUS.P1 })
            setFirstPlayerCount(firstPlayerCount + 1);
        } else {
            setBoardState(tile, { text: secondPlayerCount + 1, status: STATUS.P2 })
            setSecondPlayerCount(secondPlayerCount + 1);
        }

    }, [firstPlayerCount, secondPlayerCount, setBoardState, setFirstPlayerCount, setSecondPlayerCount])


    // display the score in the UI
    const displayScore = useCallback((winner, score) => {
        const scoreMessage = getScoreBoardMessage(playerType, winner, score);
        setScoreMessage(scoreMessage);
    }, [playerType, setScoreMessage])

    const resetBoard = useCallback(() => {
        setBoardState(initializeBoard())
        setFirstPlayerCount(0)
        setSecondPlayerCount(0)
    }, [setBoardState, setFirstPlayerCount, setSecondPlayerCount])


    useEffect(() => {
        if (winner && winner === playerType && blackHole) {
            socket.emit('declareWinner', { room: roomId, winner, score, blackHole });
            displayScore(winner, score);
        }
    }, [winner, score, displayScore, roomId, playerType, blackHole])

    useEffect(() => {
        if (playerType === "P2" && firstPlayerCount === 10 && secondPlayerCount === 10) {
            checkWinner();
        }
    }, [firstPlayerCount, secondPlayerCount, playerType, checkWinner])



    // SOCKET LISTENERS
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
            setBoardState(data.blackHole, { text: "??", status: STATUS.BLACK_HOLE })
            displayScore(data.winner, data.score);
        });

        //reset Game board for the opponent.
        socket.on('resetGameBoard', () => {
            resetBoard();
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
        setBoardState,
        setCanStartGame,
        setPlayerTurn,
        setRoomId,
        setShowBoard,
        updateBoard,
        resetBoard
    ]);

    return { board, message, updateBoard, resetBoard };
}

export default useSocket;