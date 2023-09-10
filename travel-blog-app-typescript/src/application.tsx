import React, { useEffect, useReducer, useState } from 'react';
import { Route, RouteComponentProps, Routes } from 'react-router';
// import AuthRoute from './components/AuthRoute';
// import LoadingComponent from './components/LoadingComponent';
import logging from './config/logging';
import routes from './config/routes';
import { initialUserState, UserContextProvider, userReducer } from './contexts/user';
// import { Switch } from 'react-router';
// import { Validate } from './modules/Auth';

export interface IApplicationProps { }

const Application: React.FunctionComponent<IApplicationProps> = props => {
    const [userState, userDispatch] = useReducer(userReducer, initialUserState);
    const [authStage, setAuthStage] = useState<string>('Checking localstorage ...');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            CheckLocalStorageForCredentials();
        }, 1000);

        // eslint-disable-next-line
    }, []);

    const CheckLocalStorageForCredentials = () => {
        setAuthStage('Checking credentials ...');

        const fire_token = localStorage.getItem('fire_token');

        if (fire_token === null)
        {
            userDispatch({ type: 'logout', payload: initialUserState });
            setAuthStage('No credentials found');
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
        else
        {
            return Validate(fire_token, (error, user) => {
                if (error)
                {
                    logging.error(error);
                    userDispatch({ type: 'logout', payload: initialUserState });
                    setLoading(false);
                    
                }
                else if (user)
                {
                    userDispatch({ type: 'login', payload: { user, fire_token } });
                    setLoading(false);
                }
            })
        }
    }

    const userContextValues = {
        userState,
        userDispatch
    };

    if (loading)
    {
        return <LoadingComponent>{authStage}</LoadingComponent>;
    }

    return (
        <UserContextProvider value={userContextValues}>
            <Routes>
                {routes.map((route, index) => {
                    if (route.auth)
                    {
                        return (
                            <Route
                                path={route.path}
                               
                                key={index}
                                render={(routeProps: RouteComponentProps) => <AuthRoute><route.component {...routeProps} /></AuthRoute> }
                            />
                        );
                    }
                    
                    return (
                        <Route
                            path={route.path}
                           
                            key={index}
                            render={(routeProps: RouteComponentProps) => <route.component {...routeProps} />}
                        />
                    );
                })}
            </Routes>
        </UserContextProvider>
    );
}

export default Application;