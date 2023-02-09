// owners-api-interceptors.js

import {getAuthHeader, logoutAuthState} from "../components/AuthServices/Auth";

export const requestReviewOwners = (config, token) => {
    if (token) {
        config.headers = getAuthHeader(token);
    }
    return config;
};

export const responseReviewOwners = (error, setCurrentUser, navigate) => {
    console.log(error);
    logoutAuthState(setCurrentUser);
    navigate("/");
    return Promise.reject(error);
};
