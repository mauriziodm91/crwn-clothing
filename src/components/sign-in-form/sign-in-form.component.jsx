import { useState } from 'react'

import { SignUpContainer, ButtonsContainer } from './sign-in-form.styles'

import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import { useDispatch } from 'react-redux'

import {
  googleSignInStart,
  emailSignInStart,
} from '../../store/user/user.actions.js'

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields
  const dispatch = useDispatch()

  //clear the form field taking the default form fields
  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart())
  }

  //handle function for the onSubmit event
  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      dispatch(emailSignInStart(email, password))
      resetFormFields()
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email')
          break
        case 'auth/user-not-found':
          alert('no user associated with this email')
          break
        default:
          console.log(error)
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
    <SignUpContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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

        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>
          <Button
            type='button'
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            sign in with Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignUpContainer>
  )
}

export default SignInForm
