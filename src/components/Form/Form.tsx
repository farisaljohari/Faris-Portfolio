import { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import emailjs from 'emailjs-com'
import validator from 'validator'
import { Container, ContainerSucces } from './styles'

export function Form() {
  const [validEmail, setValidEmail] = useState(false)
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  function verifyEmail(email: string) {
    setValidEmail(validator.isEmail(email))
    setEmail(email)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validEmail || !message) {
      toast.error('Please enter a valid email and message.')
      return
    }
  
    setIsSubmitting(true)
    
    const templateParams = {
      email: email,
      name: email.toString().split('@')[0],
      message: message,
    }
  
    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID || '', 
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '', 
      templateParams, 
      process.env.REACT_APP_EMAILJS_USER_ID || ''
    )
      .then(() => {
        setEmailSent(true)
        setEmail('')
        setMessage('')
      })
      .catch(() => {
        toast.error('Failed to send email.')
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }
  
  useEffect(() => {
    if (emailSent) {
      toast.success('Email successfully sent!', {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnFocusLoss: false,
        closeOnClick: true,
        hideProgressBar: false,
        toastId: 'succeeded',
      })
    }
  }, [emailSent])

  if (emailSent) {
    return (
      <ContainerSucces>
        <h3>Thanks for getting in touch!</h3>
        <button
          onClick={() => {
            setEmailSent(false)
          }}
        >
          Send another 
        </button>
        <ToastContainer />
      </ContainerSucces>
    )
  }

  return (
    <Container>
      <h2>Get in touch using the form</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          id="email"
          type="email"
          name="email"
          onChange={(e) => verifyEmail(e.target.value)}
          value={email}
          required
        />
        <textarea
          required
          placeholder="Send a message to get started."
          id="message"
          name="message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button
          type="submit"
          disabled={isSubmitting || !validEmail || !message}
        >
          Submit
        </button>
      </form>
      <ToastContainer  />
    </Container>
  )
}
