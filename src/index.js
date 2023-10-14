import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.css'
import TokenContextProvider from './Components/Context/TokenContext';
import { QueryClient, QueryClientProvider } from 'react-query'
import CartContextProvider from './Components/Context/CartContext';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
let queryClient = new QueryClient();

root.render(

    <QueryClientProvider client={queryClient}>
        <CartContextProvider>
            <TokenContextProvider>
                <App />
                <Toaster/>
            </TokenContextProvider>
        </CartContextProvider>
        
    </QueryClientProvider>
);