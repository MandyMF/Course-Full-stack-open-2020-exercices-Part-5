import React from 'react'
import '../styles/notification.css'

const Notification = ({success, message, display}) =>
{ 
  return (
    <div style={display ? {display:''} : {display:'none'}}>
    <div className={success ? 'success': 'error'}>
      {message}
    </div>
    </div>
  ) 
}

export default Notification