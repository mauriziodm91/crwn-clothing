import { createContext, useEffect, useReducer } from 'react'

import { createAction } from '../utils/reducer/reducer.utils'

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils'

// as the actual value you want to accesss
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
})

//THE ACTION TYPES
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
}
//INITIAL STATE
const INITIAL_STATE = {
  currentUser: null,
}

// THE REDUCER FUNCTION
const userReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`)
  }
}

export const UserProvider = ({ children }) => {
  //USING THE REDUCER WITH USEREDUCER HOOK
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE)

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])
  const value = { currentUser }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
