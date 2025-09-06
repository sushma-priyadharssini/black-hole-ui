export const setRoomId = (dispatch) => (payload) =>
    dispatch({
        type: "SET_ROOM_ID",
        payload,
    });

export const setFirstPlayerCount = (dispatch) => (payload) =>
    dispatch({
        type: "SET_FIRST_PLAYER_COUNT",
        payload,
    });

export const setSecondPlayerCount = (dispatch) => (payload) =>
    dispatch({
        type: "SET_SECOND_PLAYER_COUNT",
        payload,
    });