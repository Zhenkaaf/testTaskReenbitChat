import { useState} from 'react';
import s from './Window.module.css';


const Window = (props) => {
    console.log(props);

    let activeItem = props.contactsData.filter(item => {
        if (props.activeContactId == item.id) {
            return item;
        }

    })

    let messages = activeItem[0].messages.map((item, index) => {
        return <ActiveItemMessages key={index} text={item.text} type={item.type} ></ActiveItemMessages>;
    })

    return (
        <div>
            <div className={s.windowBody}>
                <div>{activeItem[0].name}</div>
                <div className={s.messagesBody}>{messages}</div>
            </div>
            <TypeMessage addNewMessage={props.addNewMessage} activeContactId={props.activeContactId}></TypeMessage>
        </div>
    )
}

const ActiveItemMessages = (props) => {
    return (
        <div className={props.type == 'question' ? s.messageBody : ''}>
            <div className={props.type == 'answer' ? s.messageTextAnswer : s.messageTextQuestion}>{props.text}</div>
        </div>
    )
}

const TypeMessage = (props) => {
    let [newMessage, setNewMessageText] = useState('');
  
    const textChange = (event) => {
        setNewMessageText(event.currentTarget.value);
    }

    const clearInputValue = () => {
        setNewMessageText('');
    }

    return (
        <div>
            <div>
                <input type="text" placeholder='Type your message' value={newMessage} onChange={textChange} />
              {  <span className={s.sendArrow} onClick={()=>{props.addNewMessage(newMessage, props.activeContactId); clearInputValue()}}>➤</span>}
            </div>
        </div>
    )
}

export default Window;