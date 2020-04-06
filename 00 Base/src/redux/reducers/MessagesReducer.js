import { GET_ALL, ADD_MESSAGE } from '../actions/MessagesActions'

const initialState = {
    messages:  []
}

function MessagesReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_MESSAGE:
        const messages = [
          ...state.messages,
          action.payload,
        ].filter((item, index)=>{
          return item.id == index;
        }) 
        return{
          ...state,
          messages: messages,
        }
      case GET_ALL:
        return {
          ...state,
          messages: action.payload
        }
      default:
        return state
    }
}

export default  MessagesReducer
