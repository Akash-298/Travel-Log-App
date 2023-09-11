import React, { useContext, useState } from 'react';

// import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import ErrorText from '../components/ErrorText';
import { Providers } from '../config/firebase';
import logging from '../config/logging';
// import firebase from 'firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {  SignInWithSocialMedia } from '../modules/Auth';
import CenterPiece from '../components/CenterPiece';
import LoadingComponent from '../components/LoadingComponent';
import UserContext from '../contexts/user';

const LoginPage: React.FunctionComponent<{}> = props => {
    const [authenticating, setAuthenticating] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const userContext = useContext(UserContext)
    // const history = useHistory();
    const history = useNavigate();
    const isLogin = window.location.pathname.includes('login');

    // const signInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
    //     if (error !== '') setError('');

    //     setAuthenticating(true);

    //     SignInWithSocialMedia(provider)
    //     .then(async (result) => {
    //         logging.info(result);
            
    //         const user = result.user;
            
    //         if (user)
    //         {
    //             const uid = user.uid;
    //             const name = user.displayName;

    //             if (name)
    //             {
    //                 try 
    //                 {
    //                     const fire_token = await user.getIdToken();

    //                     Authenticate(uid, name, fire_token, (error, _user) => {
    //                         if (error)
    //                         {
    //                             setError(error);
    //                             setAuthenticating(false);
    //                         }
    //                         else if (_user)
    //                         {
    //                             userContext.userDispatch({ type: 'login', payload: { user: _user, fire_token } })
    //                             history.push('/');
    //                         }
    //                     });
    //                 } 
    //                 catch (error) 
    //                 {
    //                     setError('Invalid token.');
    //                     logging.error(error);
    //                     setAuthenticating(false);
    //                 }
    //             }
    //             else
    //             {
    //                setError('Display name is absent from the identity provider.')
    //                 setAuthenticating(false);
    //             }
                
    //         }
    //         else
    //         {
    //             setError('Lack of info on this social media. Try another.')
    //             setAuthenticating(false);
    //         }
    //     })
    //     .catch(error => {
    //         logging.error(error);
    //         setAuthenticating(false);
    //         setError(error.message);
    //     });
    // }

    
const signInWithSocialMedia = async () => {
    if (error !== '') setError('');

    setAuthenticating(true);

    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const navigate = useNavigate();

    try {
        const result = await signInWithPopup(auth, provider);
        logging.info(result);

        const user = result.user;

        if (user) {
            const uid = user.uid;
            const name = user.displayName;

            if (name) {
                try {
                    const fire_token = await user.getIdToken();

                    // Authenticate(uid, name, fire_token, (error, _user) => {
                    //     if (error) {
                    //         setError(error);
                    //         setAuthenticating(false);
                    //     } else if (_user) {
                    //         userContext.userDispatch({ type: 'login', payload: { user: _user, fire_token } });
                    //         navigate('/');
                    //     }
                    // });
                } catch (error) {
                    setError('Invalid token.');
                    logging.error(error);
                    setAuthenticating(false);
                }
            } else {
                setError('Display name is absent from the identity provider.');
                setAuthenticating(false);
            }
        } else {
            setError('Lack of info on this social media. Try another.');
            setAuthenticating(false);
        }
    } catch (error) {
        logging.error(error);
        setAuthenticating(false);
        setError(error.message);
    }
};


    return (
        <CenterPiece>
            <Card>
                <CardHeader>
                    {isLogin ? 'Login' : 'Sign Up'}
                </CardHeader>
                <CardBody>
                    <ErrorText error={error} />
                    <Button
                        block
                        disabled={authenticating}
                        onClick={() => signInWithSocialMedia()}
                        style={{ backgroundColor:'#ea4335', borderColor: '#ea4335'}} 
                    >
                        <i className="fab fa-google mr-2"></i> Sign {isLogin ? 'in' : 'up'} with Google
                    </Button>
                    {authenticating && <LoadingComponent card={false} />} 
                </CardBody>
            </Card>
        </CenterPiece>
    );
}

export default LoginPage;