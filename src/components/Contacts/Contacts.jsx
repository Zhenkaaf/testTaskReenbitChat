import React, { useEffect } from "react";
import ContactItem from "./ContactItem";
import s from "./Contacts.module.css";
import { useState } from 'react';


const Contacts = (props) => {
let notificationWondow = React.createRef();

    useEffect(() => {
        if (props.notification != null) {
            let node = notificationWondow.current;
            node.style.visibility = 'visible';
            setTimeout(()=>{
                node.style.visibility = 'hidden';
            }, 3000);
        }
    }, [props.notification])

    const [desiredContact, setDesiredContact] = useState('');
    const findContact = (e) => {
        setDesiredContact(e.target.value);
    }

    let filteredContacts = props.contactsData.filter(item => {
        return item.name.toLowerCase().includes(desiredContact.toLowerCase());
    })

    let contacts = filteredContacts.map(item => {
        return <ContactItem key={item.id} id={item.id} photoURL={item.photoURL} name={item.name} messages={localStorage.getItem(item.id) == null ? item.messages : JSON.parse(localStorage.getItem(item.id))} setNewId={props.setNewId}></ContactItem>;
    })


    return (
        <div>
            <div className={s.searchBody}>
                <div className={s.itemAvaBlock}><img className={s.itemAva} src={`${props.photoURL ? props.photoURL : 'https://media-exp1.licdn.com/dms/image/D4E35AQG0OrD5JfOTKw/profile-framedphoto-shrink_400_400/0/1660498327653?e=1661432400&v=beta&t=BDatajJ1kgDlaW6MJPoyNTeSKO7I9njf6WH92fH4MTI'}`}></img><span className={s.avaOnline}>✓</span></div>
                <div className={s.searchBlock}>
                    <input className={s.search} onChange={findContact} onBlur={()=>{setDesiredContact('')}} value={desiredContact} placeholder={'Search or start new chat'}></input>
                </div>
            </div>
            <div className={s.contactsBody}>
               <div className={s.chatsInfo}>
                    <h2>Chats</h2>
                    <div className={s.notificationWindow} ref={notificationWondow}>{props.notificationName} sent you a message</div>
                    </div>
                <div>{contacts}</div>
            </div>
        </div>
    )
}
export default Contacts;