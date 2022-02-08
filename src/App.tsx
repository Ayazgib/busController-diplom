import React from 'react';
import './App.css';
import './reset.css';
import Header from "./components/Header";
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {compose, createStore} from "redux";
import {rootReducer} from "./redux/rootReducer";
import {Provider, useDispatch, useSelector} from 'react-redux'
import Auth from "./components/Authorization";
import Main from "./components/Main";

//@ts-ignore
const store = createStore(rootReducer, compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

function App() {


  return (
      <Provider store={store} >
          <Router>
              {/*<Header />*/}
              <Main />
           </Router>
      </Provider>
  );
}

export default App;
