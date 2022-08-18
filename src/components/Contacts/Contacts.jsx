import { useEffect } from "react";
import ContactItem from "./ContactItem";
import s from "./Contacts.module.css";
import { useState } from 'react';


const Contacts = (props) => {
    console.log(props.notification);
   
     useEffect(() => {
        if (props.notification != null) {
            alert('new message');
        }
             
       
             
             /* alert(`${props.notification.text} ${props.notification.name}`); */
         
     }, [props.notification])



    const [desiredContact, setDesiredContact] = useState('');
    const findContact = (e) => {
        setDesiredContact(e.target.value);
    }

    let filteredContacts = props.contactsData.filter(item => {
        return item.name.toLowerCase().includes(desiredContact.toLowerCase());
    })


    let contacts = filteredContacts.map(item => {
        return <ContactItem key={item.id} id={item.id} photoURL={item.photoURL} name={item.name} messages={localStorage.getItem(item.id) == null ? item.messages : JSON.parse(localStorage.getItem(item.id))/* item.messages */} setNewId={props.setNewId}></ContactItem>;
    })
    return (
        <div>
            <div className={s.searchBody}>
                <div className={s.myAva}>
                    ava
                </div>
                <div className={s.searchBlock}>
                    <input className={s.search} onChange={findContact} value={desiredContact} placeholder={'Search or start new chat'}></input>
                </div>
            </div>
            <div className={s.contactsBody}>
                <div><h1>Chats</h1><div>{props.notification}tttt</div></div>
                <div>{contacts}</div>
            </div>
        </div>
    )
}
export default Contacts;