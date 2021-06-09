
import React from 'react'
import { connect } from 'react-redux'
//import { useSelector} from 'react-redux'

const Notification = (props) => {
  // const notification = useSelector(state => state.notification[0])
  // const style = useSelector(state => state.notification[1])
  
  return (
    <div
      // style={style}>
      // {notification}
      style={props.style}>
      {props.notification}
      
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification[0],
    style: state.notification[1],
  }}
const ConnectedNotification = connect(mapStateToProps)(Notification)

//export default Notification
export default ConnectedNotification