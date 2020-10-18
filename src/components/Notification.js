import React from 'react'
import '../styles/notification.css'
import PropTypes from 'prop-types'

const Notification = ({ success, message, display }) =>
{
  return (
    <div style={display ? { display:'' } : { display:'none' }}>
      <div className={success ? 'success': 'error'}>
        {message}
      </div>
    </div>
  )
}

Notification.propTypes={
  success: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  display: PropTypes.bool.isRequired
}

export default Notification