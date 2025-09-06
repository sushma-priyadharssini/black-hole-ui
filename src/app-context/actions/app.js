export const setShowBoard = (dispatch) => (payload) =>
    dispatch({
        type: "SET_SHOW_BOARD",
        payload,
    });

export const setCanStartGame = (dispatch) => (payload) =>
    dispatch({
        type: "SET_CAN_START_GAME",
        payload,
    });
