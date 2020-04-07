import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app';
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import {MessagesReducer} from './redux/reducers/MessagesReducer'
import thunk from 'redux-thunk'

const MessagesStore = createStore(MessagesReducer,compose(applyMiddleware(thunk)));

ReactDOM.render(
<Provider store={MessagesStore}>
    <App />
</Provider>,

 document.getElementById('root'));
