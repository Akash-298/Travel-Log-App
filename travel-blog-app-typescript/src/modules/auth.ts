
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import config from "../config/config";
import IUser from "../interfaces/user";
import axios from "axios";
import logging from "../config/logging";
const app = initializeApp(config.firebase);
const auth = getAuth(app);

export const SignInWithSocialMedia = (provider: GoogleAuthProvider) =>
  new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });

export const Authenticate = async (
  uid: string,
  name: string,
  fire_token: string,
  callback: (error: string | null, user: IUser | null) => void
) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${config.server.url}/users/login`,
      data: {
        uid,
        name,
      },
      headers: {
        Authorization: `Bearer ${fire_token}`,
      },
    });

    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 304
    ) {
      logging.info("Successfully authenticated.");
      callback(null, response.data.user);
    } else {
      logging.info("Unable to authenticate.");
      callback("User unable to authenticate.", null);
    }
  } catch (error) {
    logging.error(error);
    callback("Unable to authenticate", null);
  }
};

export const Validate = async (
  
  fire_token: string,
  callback: (error: string | null, user: IUser | null) => void
) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${config.server.url}/users/validate`,
      
      headers: {
        Authorization: `Bearer ${fire_token}`,
      },
    });

    if (
      response.status === 200 ||
     
      response.status === 304
    ) {
      logging.info("Successfully validated.");
      callback(null, response.data.user);
    } else {
      logging.info("Unable to validate.");
      callback("User unable to validate.", null);
    }
  } catch (error) {
    logging.error(error);
    callback("Unable to validate", null);
  }
};




// export const SignInWithSocialMedia = (provider: firebase.auth.AuthProvider) =>
//     new Promise<firebase.auth.UserCredential>((resolve, reject) => {
//         auth.signInWithPopup(provider)
//             .then((result) => resolve(result))
//             .catch((error) => reject(error));
//     });

//     import { getAuth, signInWithPopup } from "firebase/auth";

// export const SignInWithSocialMedia = (provider) => {
//   const auth = getAuth();
//   return signInWithPopup(auth, provider);
// };
