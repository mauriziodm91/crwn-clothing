import { useState } from 'react'

import FormInput from '../form-input/form-input.component'

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  //clear the form field taking the default form fields
  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  //handle function for the onSubmit event
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('password do not match')
      return
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)

      await createUserDocumentFromAuth(user, { displayName })
      resetFormFields()
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email already in use')
      } else {
        console.log('user creation encountered an error: ', error)
      }
    }
  }

  //function that handle the onChange function
  const handleChange = (event) => {
    const { name, value } = event.target
    //this will spread the fields inside the object from the state,
    //[name] will get the name of the input field since it matches with the property inside
    //the formfields object it will update it with its respective value
    setFormFields({ ...formFields, [name]: value }) //this is a good object property update shorthand
  }

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />

        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />

        <FormInput
          label='ConfirmPassword'
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm
