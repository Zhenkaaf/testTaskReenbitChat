import s from './ContactItem.module.css';


const ContactItem = (props) => {

    let dateString = props.messages[props.messages.length - 1].date;
    let dateArr = dateString.split('/');
    let monthNumber = dateArr[0];

    const renameMonth = {
        1: 'Jan',
        2: 'Feb',
        3: 'Mar',
        4: 'Apr',
        5: 'May',
        6: 'Jun',
        7: 'Jul',
        8: 'Aug',
        9: 'Sep',
        10: 'Oct',
        11: 'Nov',
        12: 'Dec'
    }
    let month = renameMonth[monthNumber];
    let day = dateArr[1];
    let year = 20 + dateArr[2];

    return (
        <div>
            <div className={s.itemBody} onClick={() => { props.setNewId(props.id) }}>
                <div className={s.itemAvaBlock}><img className={s.itemAva} src={`${props.photoURL ? props.photoURL : 'https://secure.gravatar.com/avatar/177d59eb5e60f5183be02ab03a4911c7?s=250&d=mm&r=g'}`}></img><span className={s.avaOnline}>✓</span></div>
                <div className={s.itemNameText}>
                    <div className={s.itemName}>{props.name}</div>
                    <div className={s.itemText}>{props.messages.length ? props.messages[props.messages.length - 1].text : ''}</div>
                </div>
                <div className={s.itemDate}>{`${month} ${day}, ${year}`}</div>
            </div>
        </div>
    )
}
export default ContactItem;