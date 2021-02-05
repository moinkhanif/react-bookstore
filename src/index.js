import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/index';
import App from './components/App/App.component';
import reportWebVitals from './reportWebVitals';

// eslint-disable-next-line no-unused-vars
const initialStatee = {
  books: [{
    id: Math.floor(Math.random() * 1000),
    title: 'Eloquent JavaScript, Second Edition',
    category: 'Learning',
  },
  {
    id: Math.floor(Math.random() * 1000),
    title: 'The Great Gatsby',
    category: 'Learning',
  },
  ],
};

const store = createStore(rootReducer, initialStatee);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
