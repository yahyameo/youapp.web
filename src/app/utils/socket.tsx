import io from 'socket.io-client';
import { getAuthtoken } from './appUtils';
import { baseURL } from './api.urls';

const SERVER_URL = baseURL; // Replace with your server URL
// let token = getAuthtoken();
export const connectToWebSocket = (token:any) => {
  const socket = io(SERVER_URL, {
    auth: { token }, // Pass the token as an authentication option
    transports: ['websocket'], // Use WebSocket transport
  });

  return socket;
};