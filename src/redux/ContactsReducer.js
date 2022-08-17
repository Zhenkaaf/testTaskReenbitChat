import { cloneDeep } from 'lodash';

const NEW_MESSAGE = 'NEW_MESSAGE';
const SET_ID = 'SET_ID';
const ADD_MESSAGE = 'ADD_MESSAGE';

const initialState = {
    contactsData: [
        { id: 1, name: 'Alice Freeman', photoURL: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Alice_Freeman_Palmer%2C_1881-1887.jpg', messages: [{ type: 'answer', text: "You are the worst!", time: '4:00 AM', date: '6/12/17' }] },
        { id: 2, name: 'Josefina', photoURL: '', messages: [{ type: 'answer', text: "Quickly come to the meeting room 1B, we have a big server issue", time: '4:00 AM', date: '4/22/17' }, { type: 'question', text: "I'm having breakfast right now, can't you wait for 10 minutes?", time: '4:05 AM', date: '4/22/17' }, { type: 'answer', text: "We are losing money! Quick!", time: '4:10 AM', date: '4/22/17' }] },
        { id: 3, name: 'Velazquez', photoURL: '', messages: [{ type: 'answer', text: "Quickly come to the meeting room 1B, we have a big server issue Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", time: '4:00 AM', date: '3/18/17' }] },
        { id: 4, name: 'Barrera', photoURL: '', messages: [{ type: 'answer', text: "Quickly come to the meeting room 1B, we have a big server issue", time: '4:00 AM', date: '3/18/17' }] }
    ],
    activeContactId: '2'
}

const contactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_MESSAGE: {
            let stateCopy = cloneDeep(state);
            alert('reducerWORK');
            console.log(stateCopy);
            console.log(stateCopy == state);
        }
        case SET_ID: {
            let stateCopy = cloneDeep(state);
            stateCopy.activeContactId = action.id;
            return stateCopy;
        }
        case ADD_MESSAGE: {
            let stateCopy = cloneDeep(state);
            stateCopy.contactsData.map((item, index) => {
                if (item.id == action.contactId) {
                    let messageObj = {
                        type: 'question',
                        text: action.messageText,
                        time: '4:05 AM',
                        date: '4/22/17'
                    }
                    item.messages.push(messageObj);
                    stateCopy.contactsData.splice(0, 0, stateCopy.contactsData.splice(index, 1)[0]);
                }
            })

            return stateCopy;
        }
        default:
            return state;
    }
}

export const setIdActionCreator = (val) => {
    return {
      type: 'SET_ID',
      id: val
    };
  }
  export const addNewMessageActionCreator = (messageText, contactId) => {
    return {
      type: 'ADD_MESSAGE',
      messageText: messageText,
      contactId: contactId
    };
  }

  

export default contactsReducer;