import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import contactsReducer from "./ContactsReducer";
import thunkMiddleware from "redux-thunk";



const reducers = combineReducers({
    contacts: contactsReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
