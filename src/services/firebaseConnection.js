import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAeUmW80gWxb0cBuhG8cy1lKo9_Ec4d-dQ',
  authDomain: 'helpdesk-6aa2c.firebaseapp.com',
  projectId: 'helpdesk-6aa2c',
  storageBucket: 'helpdesk-6aa2c.appspot.com',
  messagingSenderId: '500195776004',
  appId: '1:500195776004:web:e60794c5274c4c07f58751',
  measurementId: 'G-3W21E6BHBQ'
}

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

export { auth, db, storage }
