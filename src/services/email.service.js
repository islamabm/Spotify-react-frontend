import emailjs from 'emailjs-com'
import { showSuccessMsg, showErrorMsg } from './event-bus.service'

export const emailService = {
  sendEmail,
}

function sendEmail(userDetails) {
  return emailjs
    .send(
      process.env.REACT_APP_SERVICE_ID,
      process.env.REACT_APP_TEMPLATE_ID,
      {
        user_name: userDetails.username,
        user_email: userDetails.email,
      },
      process.env.REACT_APP_USER_ID
    )
    .then((response) => {
      showSuccessMsg('Email successfully sent! Check your email')
    })
    .catch((error) => {
      showErrorMsg('Email failed sent!', error)
    })
}
