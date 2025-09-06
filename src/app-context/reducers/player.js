export const player = (state, action) => {
    switch (action.type) {
        case 'SET_PLAYER_NAME':
            return {
                ...state,
                playerName: action.payload
            };
        case 'SET_PLAYER_TYPE':
            return {
                ...state,
                playerType: action.payload
            };
        case 'SET_PLAYER_TURN':
            return {
                ...state,
                playerTurn: action.payload
            };
        default:
            return state;
    }
}