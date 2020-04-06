import { createStore } from 'redux';
import {MessageReducer} from '../reducers/MessagesReducer';

const Messagestore = createStore(MessageReducer);

export default Messagestore;