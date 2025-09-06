export const setPlayerName = (dispatch) => (payload) =>
    dispatch({
        type: "SET_PLAYER_NAME",
        payload,
    });

export const setPlayerTurn = (dispatch) => (payload) =>
    dispatch({
        type: "SET_PLAYER_TURN",
        payload,
    });

export const setPlayerType = (dispatch) => (payload) =>
    dispatch({
        type: "SET_PLAYER_TYPE",
        payload,
    });