import ContactItem from "./ContactItem";
import s from "./Contacts.module.css";


const Contacts = (props) => {
    console.log(props);
    let contacts = props.contactsData.map(item => {
        return <ContactItem key={item.id} id={item.id} photoURL={item.photoURL} name={item.name} messages={item.messages} setNewId={props.setNewId}></ContactItem>;
    })
    return (
        <div>
            <div className={s.contactsBody}>
                <h1>Chats</h1>
                <div>{contacts}</div>
            </div>
        </div>
    )
}
export default Contacts;