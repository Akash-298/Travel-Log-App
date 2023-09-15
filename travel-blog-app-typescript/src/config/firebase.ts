import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import config from '../config/config';

// const Firebase = initializeApp(config.firebase);
const app = initializeApp(config.firebase);
const auth = getAuth(app);

export const Providers = {
    google: new GoogleAuthProvider()
};


export { app as Firebase, auth };
