import { useEffect } from "react";
import ContactItem from "./ContactItem";
import s from "./Contacts.module.css";


const Contacts = (props) => {
    console.log(props);
    useEffect(() => {
        if(props.notification != null) {
            alert(props.notification);
        }
    }, [props.notification])
    let contacts = props.contactsData.map(item => {
        return <ContactItem key={item.id} id={item.id} photoURL={item.photoURL} name={item.name} messages={item.messages} setNewId={props.setNewId}></ContactItem>;
    })
    return (
        <div>
            <div className={s.contactsBody}>
                <h1>Chats</h1>
               {/*  <div>{props.notification}</div> */}
                <div>{contacts}</div>
            </div>
        </div>
    )
}
export default Contacts;