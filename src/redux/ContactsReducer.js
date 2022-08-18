import { cloneDeep } from 'lodash';
import axios from 'axios';

const SET_ID = 'SET_ID';
const ADD_MESSAGE = 'ADD_MESSAGE';
const ADD_MESSAGE_FROM_SERVER = 'ADD_MESSAGE_FROM_SERVER';
const NOTIFICATION = 'NOTIFICATION';

const initialState = {
    contactsData: [
        { id: 1, name: 'Alice Freeman', photoURL: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Alice_Freeman_Palmer%2C_1881-1887.jpg', messages: [{ type: 'answer', text: "You are the worst!", time: '4:00 AM', date: '6/12/17' }] },
        { id: 2, name: 'Josefina', photoURL: '', messages: [{ type: 'answer', text: "Quickly come to the meeting room 1B, we have a big server issue", time: '4:00 AM', date: '4/22/17' }, { type: 'question', text: "I'm having breakfast right now, can't you wait for 10 minutes?", time: '4:05 AM', date: '4/22/17' }, { type: 'answer', text: "We are losing money! Quick!", time: '4:10 AM', date: '4/22/17' }] },
        { id: 3, name: 'Velazquez', photoURL: '', messages: [{ type: 'answer', text: "Quickly come to the meeting room 1B, we have a big server issue Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", time: '4:00 AM', date: '3/18/17' }] },
        { id: 4, name: 'Barrera', photoURL: '', messages: [{ type: 'answer', text: "Quickly come to the meeting room 1B, we have a big server issue", time: '4:00 AM', date: '3/18/17' }] }
    ],
    activeContactId: '2',
    notification: null,
    notificationName: null
}

const contactsReducer = (state = initialState, action) => {
    switch (action.type) {
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

                    if (localStorage.getItem(action.contactId) == null) {
                        let localStorageArr = [];
                        localStorageArr = localStorageArr.concat(item.messages);
                        localStorageArr.push(messageObj);
                        let convertedToJson = JSON.stringify(localStorageArr);
                        localStorage.setItem(action.contactId, convertedToJson);
                    }
                    else {
                        let returnedObj = localStorage.getItem(action.contactId);
                        let localStorageArr = JSON.parse(returnedObj);
                        localStorageArr.push(messageObj);
                        let convertedToJson = JSON.stringify(localStorageArr);
                        localStorage.setItem(action.contactId, convertedToJson);
                    }
                    /*  let returnedObj = localStorage.getItem(action.contactId);
                         let localStorageArr = JSON.parse(returnedObj); */

                    /* for (let i = 0; i < localStorageArr.length; i++) {
                        item.messages.push(localStorageArr[i]);
                    } */
                    /* item.messages.push(localStorageArr[localStorageArr.length - 1]); */

                    stateCopy.contactsData.splice(0, 0, stateCopy.contactsData.splice(index, 1)[0]);
                }
            })
            return stateCopy;
        }
        case ADD_MESSAGE_FROM_SERVER: {
            let stateCopy = cloneDeep(state);
            stateCopy.contactsData.map((item, index) => {
                if (item.id == action.contactId) {
                    let messageObj = {
                        type: 'answer',
                        text: action.messageText,
                        time: '4:05 AM',
                        date: '4/22/17'
                    }
                    if (localStorage.getItem(action.contactId) == null) {
                        let localStorageArr = [];
                        localStorageArr = localStorageArr.concat(item.messages);
                        localStorageArr.push(messageObj);
                        let convertedToJson = JSON.stringify(localStorageArr);
                        localStorage.setItem(action.contactId, convertedToJson);
                    }
                    else {
                        let returnedObj = localStorage.getItem(action.contactId);
                        let localStorageArr = JSON.parse(returnedObj);
                        localStorageArr.push(messageObj);
                        let convertedToJson = JSON.stringify(localStorageArr);
                        localStorage.setItem(action.contactId, convertedToJson);
                    }
                    /*  let returnedObj = localStorage.getItem(action.contactId);
                         let localStorageArr = JSON.parse(returnedObj); */
                    /* for (let i = 0; i < localStorageArr.length; i++) {
                        item.messages.push(localStorageArr[i]);
                    } */
                    /*    item.messages.push(localStorageArr[localStorageArr.length - 1]); */

                    /* item.messages.push(messageObj); */
                    stateCopy.contactsData.splice(0, 0, stateCopy.contactsData.splice(index, 1)[0]);
                    /* stateCopy.notification = item.name; */
                    /*   stateCopy.notification.text = 'You have new message from '; */
                }
            })
            return stateCopy;
        }
        case NOTIFICATION: {
            let stateCopy = cloneDeep(state);
            if (stateCopy.notification == false) {
                stateCopy.notification = true;
            }
            else {
                stateCopy.notification = false;
            }
            stateCopy.contactsData.filter(item => {
                if (item.id == action.contactId) {
                    stateCopy.notificationName = item.name;
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
export const addNewMessageFromServerActionCreator = (messageText, contactId) => {
    return {
        type: 'ADD_MESSAGE_FROM_SERVER',
        messageText: messageText,
        contactId: contactId
    };
}
const notification = (contactId) => {
    return {
        type: 'NOTIFICATION',
        contactId: contactId
    }
}
export const getAnswerThunkCreator = (contactId) => {
    return (dispatch) => {
        axios.get('https://api.chucknorris.io/jokes/random')
            .then(response => {
                setTimeout(() => {
                    dispatch(addNewMessageFromServerActionCreator(response.data.value, contactId));
                    dispatch(notification(contactId));
                }, 10000);
            })
    }
}


export default contactsReducer;