import { app } from "./app";
import { player } from "./player";
import { game } from "./game";

export const initialState = {
    app: {
        showBoard: false,
        canStartGame: false
    },
    player: {
        name: "",
        type: "P1",
        currentTurn: true
    },
    game: {
        roomId: null,
        firstPlayerCount: 1,
        secondPlayerCount: 1
    }
};

export const rootReducer = (state, action) => ({
    app: app(state.app, action),
    player: player(state.player, action),
    game: game(state.game, action)
});