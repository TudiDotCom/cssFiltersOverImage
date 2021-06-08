import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from "./Containers/Home";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import {Provider} from "react-redux";
// import { createStore } from 'redux'
// import rootReducer from "./data/reducers";
//const store = createStore(rootReducer)
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('root');


const renderApp = Component => {
  ReactDOM.render(
          <BrowserRouter>
              <Component />
          </BrowserRouter>,
      rootElement
  );
};
renderApp(Home);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
