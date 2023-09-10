import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import config from '../config/config';

const Firebase = initializeApp(config.firebase);
const auth = getAuth();

export const Providers = {
    google: new GoogleAuthProvider()
};

export { Firebase, auth };
