import { NavLink } from 'react-router-dom';
import s from './ContactItem.module.css';


const ContactItem = (props) => {
   
    
    return (
       
            <div>
                <div className={s.itemBody} onClick={()=>{props.setNewId(props.id)}}>
                    <div><img className={s.itemAva} src={`${props.photoURL ? props.photoURL : 'https://secure.gravatar.com/avatar/177d59eb5e60f5183be02ab03a4911c7?s=250&d=mm&r=g'}`}></img></div>
                    <div className={s.itemNameText}>
                        <div className={s.itemName}>{props.name}</div>
                        <div className={s.itemText}>{props.messages.length ? props.messages[props.messages.length - 1].text : ''}</div>
                    </div>
                    <div className={s.itemDate}>{props.messages.length ? props.messages[props.messages.length - 1].date : ''}</div>
                </div>
            </div>
       

    )
}
export default ContactItem;