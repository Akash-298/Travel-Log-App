import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth' ;
import { initializeApp } from 'firebase/app' ;
import config from '../config/config' ;

const app = initializeApp(config.firebase) ;
const auth = getAuth(app) ;

export const SignInWithSocialMedia = (provider: GoogleAuthProvider) =>
  new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
