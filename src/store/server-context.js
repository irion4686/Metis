import React from 'react';
import dotenv from 'dotenv';
dotenv.config();
let server;
if (process.env.REACT_APP_ENV === 'DEV') {
    server = 'http://localhost:3001/';
} else {
    server = 'http://ec2-44-193-80-73.compute-1.amazonaws.com:3001/';
}
const ServerContext = React.createContext({
    SERVER: server
});
export default ServerContext;