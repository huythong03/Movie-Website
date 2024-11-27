import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

// Lấy phần tử DOM gốc
const container = document.getElementById('root');

// Tạo root bằng createRoot
const root = createRoot(container);

// Render ứng dụng
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
