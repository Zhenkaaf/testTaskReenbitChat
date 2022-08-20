import React, { useEffect, useState } from 'react';
import s from './Window.module.css';
import useKeypress from 'react-use-keypress';


const Window = (props) => {

    let activeItem = props.contactsData.filter(item => {
        if (props.activeContactId == item.id) {
            return item;
        }
    })
    let dataForDisplay;
    let activeItemId = activeItem[0].id;
    if (localStorage.getItem(activeItemId) == null) {
        dataForDisplay = activeItem[0].messages;
    }
    else {
        let returnedObj = localStorage.getItem(activeItemId);
        let localStorageArr = JSON.parse(returnedObj);
        dataForDisplay = localStorageArr;
    }


    let messages = dataForDisplay.map((item, index) => {
        return <ActiveItemMessage key={index} text={item.text} type={item.type} ava={activeItem[0].photoURL} time={item.time} date={item.date}></ActiveItemMessage>;
    })

    let myRef = React.createRef();
    let scrollTo = () => {
        myRef.current.scrollIntoView();
    }
    useEffect(() => {
        scrollTo();
    }, [messages])

 
    return (
        <div>
            <div className={s.windowBody}>
                <div className={s.windowContactInfo}>
                    <div className={s.itemAvaBlock}><img className={s.itemAva} src={`${activeItem[0].photoURL ? activeItem[0].photoURL : 'https://secure.gravatar.com/avatar/177d59eb5e60f5183be02ab03a4911c7?s=250&d=mm&r=g'}`}></img><span className={s.avaOnline}>✓</span></div>
                    <div className={s.windowContactName}>{activeItem[0].name}</div>
                </div>
                <div className={s.messagesBody}>
                    <div>{messages}<div ref={myRef}></div></div>
                </div>
            </div>
            <TypeMessage getAnswer={props.getAnswer} addNewMessage={props.addNewMessage} activeContactId={props.activeContactId}></TypeMessage>
        </div>
    )
}

const ActiveItemMessage = (props) => {
    return (
        <div className={s.activeItemMessageBody}>
            {props.type == 'question'

                ? <div><div className={s.questionBody}>
                    <div className={s.messageTextQuestion}>{props.text}</div>
                </div>
                    <div className={s.dateBlockQuestion}>
                        <div className={s.dateBlockdate}>{props.date} ,</div>
                        <div>{props.time}</div>
                    </div>
                </div>

                : <div className={s.answerBody}>
                    <div className={s.answerContainer}>
                        <div>
                            <img className={s.itemAva} src={`${props.ava ? props.ava : 'https://secure.gravatar.com/avatar/177d59eb5e60f5183be02ab03a4911c7?s=250&d=mm&r=g'}`}></img>
                        </div>
                        <div className={s.messageTextAnswer}>{props.text}</div>
                    </div>
                    <div className={s.dateBlockAnswer}>
                        <div className={s.dateBlockdate}>{props.date} ,</div>
                        <div>{props.time}</div>
                    </div>
                </div>}
        </div>
    )
}

const TypeMessage = (props) => {
    let [newMessage, setNewMessageText] = useState('');

    let stateBtn = true;
    if (newMessage.length > 0 && newMessage.match(/^\s+$/) === null) {
        stateBtn = false;
    }

    const textChange = (event) => {
        setNewMessageText(event.currentTarget.value);
    }

    const clearInputValue = () => {
        setNewMessageText('');
    }

    useKeypress(['Enter'], (event) => {
        if (event.key === 'Enter') {
            if (newMessage.length > 0 && newMessage.match(/^\s+$/) === null) {
                props.addNewMessage(newMessage, props.activeContactId);
                clearInputValue();
                props.getAnswer(props.activeContactId);
            }
        } 
      })


    return (
        <div>
            <div className={s.typeYourMessageBody}>
                <div className={s.typeYourMessageBlock}>
                    <input className={s.typeYourMessageField} type="text" placeholder='Type your message' value={newMessage} onChange={textChange} />
                    <button className={s.typeYourMessageArrow} disabled={stateBtn} onClick={() => { props.addNewMessage(newMessage, props.activeContactId); clearInputValue(); props.getAnswer(props.activeContactId) }}>➤</button>
                </div>
            </div>
        </div>
    )
}

export default Window;