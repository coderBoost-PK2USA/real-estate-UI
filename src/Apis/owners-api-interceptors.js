// owners-api-interceptors.js

import {getAuthHeader, logoutAuthState} from "../components/AuthServices/Auth";

export const requestInterceptor = (config, token) => {
    if (token) {
        config.headers = getAuthHeader(token);
    }

    console.log(config);
    return config;
};

export const responseReviewOwners = (error, setCurrentUser, navigate) => {
    logoutAuthState(setCurrentUser);
    navigate("/");
    return Promise.reject(error);
};
