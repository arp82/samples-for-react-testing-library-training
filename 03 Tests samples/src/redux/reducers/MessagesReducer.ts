import { GET_ALL, ADD_MESSAGE } from '../actions/MessagesActions';

const initialState = {
	messages:  []
};

export function MessagesReducer(state = initialState, action) {
	switch (action.type) {
	case ADD_MESSAGE:

		const filterFunction = (array) => {
			const filteredArray = array.filter((item, index)=>{
				return item.id == index;
			}); 

			return filteredArray;
		};

		const messageArray = [
			...state.messages,
			action.payload,
		];
        
		return{
			...state,
			messages: filterFunction(messageArray),
		};
	case GET_ALL:
		return {
			...state,
			messages: action.payload
		};
	default:
		return state;
	}
}


