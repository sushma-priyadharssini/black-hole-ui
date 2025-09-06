// socket.js
import { io } from "socket.io-client";

// Create only ONE instance
const socket = io("http://localhost:4000", {
    autoConnect: true,  // auto connect on load
});

export default socket;
