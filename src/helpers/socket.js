// socket.js
import { io } from "socket.io-client";

// Create only ONE instance
const socket = io("https://black-hole-server-7lzu.onrender.com", {
    autoConnect: true,  // auto connect on load
});

export default socket;
