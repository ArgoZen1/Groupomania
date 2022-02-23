import React from "react";
import  ReactDOM  from "react-dom";
import App from "./App";
import "./styles/index.scss";
import { Provider } from 'react-redux';
// dev tools
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { getUsers } from "./actions/users.actions";
import { getPosts } from "./actions/post.actions";
// dev tools
import logger from 'redux-logger';

const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
)
store.dispatch(getUsers());
store.dispatch(getPosts());


ReactDOM.render(
    <Provider store={store}>
<App />
</Provider>,
 document.getElementById("root")
);


