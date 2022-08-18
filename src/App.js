import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/reduxStore';
import ContactsContainer from './components/Contacts/ContactsContainer';
import WindowContainer from './components/ChatWindow/WindowContainer';



function App() {
  return (

    <Provider store={store}>
      <div className='App'>
        <div className='container'>
          <div className='chatBody'>
          
            

            <div className='contactsContainer'><ContactsContainer /></div>
            <div className='windowContainer'><WindowContainer /></div>

          </div>
        </div>
      </div>
    </Provider>

  );
}

export default App;
