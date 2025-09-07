import { app } from "./app";
import { player } from "./player";
import { game } from "./game";

export const initialState = {
    app: {
        showBoard: false,
        canStartGame: false,
        scoreMessage: ''
    },
    player: {
        playerName: "",
        playerType: "P1",
        playerTurn: true
    },
    game: {
        roomId: null,
        firstPlayerCount: 0,
        secondPlayerCount: 0,
        score: 0,
        winner: null,
    }
};

export const rootReducer = (state, action) => ({
    app: app(state.app, action),
    player: player(state.player, action),
    game: game(state.game, action)
});