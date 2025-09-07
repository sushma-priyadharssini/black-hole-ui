export const app = (state, action) => {
    switch (action.type) {
        case 'SET_SHOW_BOARD':
            return {
                ...state,
                showBoard: action.payload
            };
        case 'SET_CAN_START_GAME':
            return {
                ...state,
                canStartGame: action.payload
            };
        case 'SET_SCORE_MESSAGE':
            return {
                ...state,
                scoreMessage: action.payload
            };
        case 'SET_BOARD':
            return {
                ...state,
                board: action.payload
            };
        default:
            return state;
    }
}