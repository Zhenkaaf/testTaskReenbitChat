import { useEffect, useState } from 'react';
import s from './Window.module.css';


const Window = (props) => {
    /* console.log(props.contactsData[0].messages); */

    /*   useEffect(() => {
  alert('useWork');
      }, [props]) */
    let activeItem = props.contactsData.filter(item => {
        if (props.activeContactId == item.id) {
            return item;
        }
    })
    let dataForDisplay;
    let messages;
    let activeItemId = activeItem[0].id;
    if (localStorage.getItem(activeItemId) == null) {
        alert('from props');
        dataForDisplay = activeItem[0].messages;
    }
   else {
    alert('from localStor');
        let returnedObj = localStorage.getItem(activeItemId);
        let localStorageArr = JSON.parse(returnedObj);
        dataForDisplay = localStorageArr;
   }

    /* useEffect(() => {
    if (localStorage.getItem(activeItemId) != null) {
        alert('ty');
        let returnedObj = localStorage.getItem(activeItemId);
        let localStorageArr = JSON.parse(returnedObj);
        for (let i = 0; i < localStorageArr.length; i++) {
            activeItem[0].messages.push(localStorageArr[i]);
            alert(localStorageArr[i]);
        }
    }
}) */
   /*  else {
        let returnedObj = localStorage.getItem(activeItemId);
        let localStorageArr = JSON.parse(returnedObj);
        for (let i = 0; i < localStorageArr.length; i++) {
            activeItem[0].messages.push(localStorageArr[i]);
            alert(localStorageArr[i]);
        }
    } */
    console.log(activeItem[0].messages);




    messages = /* activeItem[0].messages */dataForDisplay.map((item, index) => {
        return <ActiveItemMessages key={index} text={item.text} type={item.type} ></ActiveItemMessages>;
    })

    return (
        <div>
            <div className={s.windowBody}>
                <div>{activeItem[0].name}</div>
                <div className={s.messagesBody}>{messages}</div>
            </div>
            <TypeMessage fn={props.fn} addNewMessage={props.addNewMessage} activeContactId={props.activeContactId}></TypeMessage>
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

    let stateBtn = true;
    if (newMessage.length > 0) {
        stateBtn = false;
    }

    const textChange = (event) => {
        setNewMessageText(event.currentTarget.value);
    }

    const clearInputValue = () => {
        setNewMessageText('');
    }

    const fnAPI = () => {

        /* setTimeout(() => { */



        /*   }, 5000); */

    }

    return (
        <div>
            <div>
                <input type="text" placeholder='Type your message' value={newMessage} onChange={textChange} />
                <button className={s.sendArrow} disabled={stateBtn} onClick={() => { props.addNewMessage(newMessage, props.activeContactId); clearInputValue(); props.fn(props.activeContactId) }}>➤</button>
            </div>
        </div>
    )
}

export default Window;