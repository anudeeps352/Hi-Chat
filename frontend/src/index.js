import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter} from "react-router-dom";
import ChatProvider from './context/ChatProvider';
ReactDOM.render (
    <BrowserRouter>
    <ChatProvider>
        <ChakraProvider>
            <App/>
        </ChakraProvider>
    </ChatProvider>
    </BrowserRouter>,document.getElementById('root'));
