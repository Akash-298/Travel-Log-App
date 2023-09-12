import React, { useEffect, useReducer, useState } from "react";
import { Route, RouteComponentProps, Routes } from "react-router";
import AuthRoute from './components/AuthRoute';
import LoadingComponent from './components/LoadingComponent';
import logging from "./config/logging";
import routes from "./config/routes";
import {
  initialUserState,
  UserContextProvider,
  userReducer,
} from "./contexts/user";
import { Validate } from "./modules/Auth";

// import { Switch } from 'react-router';
// import { Validate } from './modules/Auth';

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [authStage, setAuthStage] = useState<string>(
    "Checking localstorage ..."
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      CheckLocalStorageForCredentials();
    }, 1000);

    // eslint-disable-next-line
  }, []);

  const CheckLocalStorageForCredentials = () => {
    setAuthStage("Checking credentials ...");

    const fire_token = localStorage.getItem("fire_token");

    if (fire_token === null) {
      userDispatch({ type: "logout", payload: initialUserState });
      setAuthStage("No credentials found");
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } else {
      return Validate(fire_token, (error, user) => {
        if (error) {
          logging.error(error);
          setAuthStage("User not valid, logging out...");

          userDispatch({ type: "logout", payload: initialUserState });
          setTimeout(() => {
            setLoading(false);
          }, 500);
        } else if (user) {
          setAuthStage("User Authenticated");

          userDispatch({ type: "login", payload: { user, fire_token } });
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }
      });
    }
  };

  const userContextValues = {
    userState,
    userDispatch,
  };

  if (loading) {
    return <LoadingComponent>{authStage}</LoadingComponent>;
  }

  return (
    <UserContextProvider value={userContextValues}>
      <Routes>
        {routes.map((route, index) => {
          if (route.auth) {
            return (
              <Route
                path={route.path}
                key={index}
                element={
                  <AuthRoute>
                    <route.component />
                  </AuthRoute>
                }
              />
            );
          }

          return (
            <Route
              path={route.path}
              key={index}
              element={<route.component />}
        
            />
          );
        })}
      </Routes>
    </UserContextProvider>
  );
};

export default Application;

// import  React from "react";
// // import IPageProps from "../interfaces/page";
// // import  IPageProps from "./page";

// export interface IApplicationProps{}
// const Application: React.FunctionComponent<IApplicationProps> = props => {
// return (

// <div></div>
// );
// }
// export default Application
