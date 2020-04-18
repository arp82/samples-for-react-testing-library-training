import { getListOfMessages, setMessage, } from '../../api';

export const GET_ALL = 'GET_MESSAGES';
export const ADD_MESSAGE = 'ADD_MESSAGE';

export const addMessage = message => {
	return (dispatch) => {
		return setMessage(message).then(response => {
			var action = {
				type: ADD_MESSAGE,
				payload: response[response.length - 1],
			};

			dispatch(action);
		});
	};
};


export const getAllMessages = () => {
	return (dispatch) => {
		return getListOfMessages().then(response => {
			var action = {
				type: GET_ALL,
				payload: response
			};

			dispatch(action);
		});
	};
};
