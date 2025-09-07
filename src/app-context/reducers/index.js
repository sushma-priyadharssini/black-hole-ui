import { app } from "./app";
import { player } from "./player";
import { game } from "./game";

export const initialState = {
    app: {
        showBoard: false,
        canStartGame: false,
        scoreMessage: '',
        board: null
    },
    player: {
        playerName: "",
        playerType: "P1",
        playerTurn: true
    },
    game: {
        roomId: null,
        firstPlayerCount: 1,
        secondPlayerCount: 1,
        score: 0,
        winner: null,
    }
};

export const rootReducer = (state, action) => ({
    app: app(state.app, action),
    player: player(state.player, action),
    game: game(state.game, action)
});