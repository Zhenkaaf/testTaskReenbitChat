import { connect } from "react-redux";
import { setIdActionCreator } from "../../redux/ContactsReducer";
import Contacts from "./Contacts";


const mapStateToProps = (state) => {
  return {
    contactsData: state.contacts.contactsData
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setNewId: (val) => {
      dispatch(setIdActionCreator(val))
    }
  }
}

const ContactsContainer = connect(mapStateToProps, mapDispatchToProps)(Contacts);
export default ContactsContainer;