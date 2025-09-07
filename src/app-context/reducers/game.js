export const game = (state, action) => {
    switch (action.type) {
        case 'SET_ROOM_ID':
            return {
                ...state,
                roomId: action.payload
            };
        case 'SET_FIRST_PLAYER_COUNT':
            return {
                ...state,
                firstPlayerCount: action.payload
            };
        case 'SET_SECOND_PLAYER_COUNT':
            return {
                ...state,
                secondPlayerCount: action.payload
            };
        case 'SET_WINNER':
            return {
                ...state,
                winner: action.payload
            };
        case 'SET_SCORE':
            return {
                ...state,
                score: action.payload
            };
        default:
            return state;
    }
}