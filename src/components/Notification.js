import React from 'react'
import '../styles/notification.css'

const Notification = ({success, message}) =>
{
  
  return (
    <div className={success ? 'success': 'error'}>
      {message}
    </div>
  ) 
}

export default Notification