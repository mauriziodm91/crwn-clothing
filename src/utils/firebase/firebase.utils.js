import { initializeApp } from 'firebase/app'

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCE51iCO5ZB5poAo8eDsmaPbXenodYxURM',
  authDomain: 'crwn-clothing-db-d72a1.firebaseapp.com',
  projectId: 'crwn-clothing-db-d72a1',
  storageBucket: 'crwn-clothing-db-d72a1.appspot.com',
  messagingSenderId: '593205483365',
  appId: '1:593205483365:web:a35248963a51f1141a738c',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)