/* eslint-disable no-unused-vars */
import {io} from 'socket.io-client';
const URL = 'http://localhost:8000'

export const socket = io(URL, {
    autoConnect: false,
    withCredentials: true
});