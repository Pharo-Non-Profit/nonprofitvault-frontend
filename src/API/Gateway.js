import getCustomAxios from "../Helpers/customAxios";
import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import {
    NONPROFITVAULT_LOGIN_API_ENDPOINT,
    NONPROFITVAULT_REGISTER_API_ENDPOINT,
    NONPROFITVAULT_VERSION_ENDPOINT,
    NONPROFITVAULT_LOGOUT_API_ENDPOINT,
    NONPROFITVAULT_FORGOT_PASSWORD_API_ENDPOINT,
    NONPROFITVAULT_PASSWORD_RESET_API_ENDPOINT,
    NONPROFITVAULT_EXECUTIVE_VISITS_TENANT_API_ENDPOINT,
    NONPROFITVAULT_DASHBOARD_API_ENDPOINT
} from "../Constants/API";
import { getAPIBaseURL } from '../Helpers/urlUtility';
import {
    setAccessTokenInLocalStorage,
    setRefreshTokenInLocalStorage
} from '../Helpers/jwtUtility';


export function postLoginAPI(data, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const customAxios = axios.create({
        baseURL: getAPIBaseURL(),
        headers: {
            'Content-Type': 'application/json;',
            'Accept': 'application/json',
        },
    });

    // To Snake-case for API from camel-case in React.
    let decamelizedData = decamelizeKeys(data);

    customAxios.post(NONPROFITVAULT_LOGIN_API_ENDPOINT, decamelizedData).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        let profile = camelizeKeys(responseData);

        // SAVE OUR CREDENTIALS IN PERSISTENT STORAGE. THIS IS AN IMPORTANT
        // STEP BECAUSE OUR TOKEN UTILITY HELPER NEEDS THIS.
        setAccessTokenInLocalStorage(profile.accessToken);
        setRefreshTokenInLocalStorage(profile.refreshToken);

        // Return the callback data.
        onSuccessCallback(profile);
    }).catch( (exception) => {
        let responseData = null;
        if (exception.response !== undefined && exception.response !== null) {
            if (exception.response.data !== undefined && exception.response.data !== null) {
                responseData = exception.response.data;
            } else {
                responseData = exception.response;
            }
        } else {
            responseData = exception;
        }
        let errors = camelizeKeys(responseData);

        // Check for incorrect password and enter our own custom error.
        let errorsStr = JSON.stringify(errors);
        if (errorsStr.includes("Incorrect email or password")) { // NOTE: This is the exact error from backend on incorrect email/pass.
            errors = {
                "auth": "Incorrect email or password",
            };
        }

        onErrorCallback(errors);
    }).then(onDoneCallback);
}


export function postRegisterAPI(data, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const customAxios = axios.create({
        baseURL: getAPIBaseURL(),
        headers: {
            'Content-Type': 'application/json;',
            'Accept': 'application/json',
        },
    });

    // To Snake-case for API from camel-case in React.
    let decamelizedData = decamelizeKeys(data);

    customAxios.post(NONPROFITVAULT_REGISTER_API_ENDPOINT, decamelizedData).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        let profile = camelizeKeys(responseData);

        // SAVE OUR CREDENTIALS IN PERSISTENT STORAGE. THIS IS AN IMPORTANT
        // STEP BECAUSE OUR TOKEN UTILITY HELPER NEEDS THIS.
        setAccessTokenInLocalStorage(profile.accessToken);
        setRefreshTokenInLocalStorage(profile.refreshToken);

        // Return the callback data.
        onSuccessCallback(profile);
    }).catch( (exception) => {
        let responseData = null;
        if (exception.response !== undefined && exception.response !== null) {
            if (exception.response.data !== undefined && exception.response.data !== null) {
                responseData = exception.response.data;
            } else {
                responseData = exception.response;
            }
        } else {
            responseData = exception;
        }
        let errors = camelizeKeys(responseData);

        // Check for incorrect password and enter our own custom error.
        let errorsStr = JSON.stringify(errors);
        if (errorsStr.includes("Incorrect email or password")) { // NOTE: This is the exact error from backend on incorrect email/pass.
            errors = {
                "auth": "Incorrect email or password",
            };
        }

        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function getVersionAPI(onSuccessCallback, onErrorCallback, onDoneCallback) {
    const customAxios = axios.create({
        baseURL: getAPIBaseURL(),
        headers: {
            'Content-Type': 'application/json;',
            'Accept': 'application/json',
        },
    });

    customAxios.get(NONPROFITVAULT_VERSION_ENDPOINT).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function postLogoutAPI(onSuccessCallback, onErrorCallback, onDoneCallback) {
    const customAxios = axios.create({
        baseURL: getAPIBaseURL(),
        headers: {
            'Content-Type': 'application/json;',
            'Accept': 'application/json',
        },
    });

    let data = {};
    customAxios.post(NONPROFITVAULT_LOGOUT_API_ENDPOINT, data).then((successResponse) => {
        onSuccessCallback(null);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function postForgotPasswordAPI(email, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const customAxios = axios.create({
        baseURL: getAPIBaseURL(),
        headers: {
            'Content-Type': 'application/json;',
            'Accept': 'application/json',
        },
    });

    customAxios.post(NONPROFITVAULT_FORGOT_PASSWORD_API_ENDPOINT, {email: email}).then((successResponse) => {
        console.log("postForgotPasswordAPI: Success")
        onSuccessCallback(); // Return the callback data.
    }).catch( (exception) => {
        let responseData = null;
        if (exception.response !== undefined && exception.response !== null) {
            if (exception.response.data !== undefined && exception.response.data !== null) {
                responseData = exception.response.data;
            } else {
                responseData = exception.response;
            }
        } else {
            responseData = exception;
        }
        let errors = camelizeKeys(responseData);

        // Check for incorrect password and enter our own custom error.
        let errorsStr = JSON.stringify(errors);
        if (errorsStr.includes("Incorrect email or password")) { // NOTE: This is the exact error from backend on incorrect email/pass.
            errors = {
                "auth": "Incorrect email or password",
            };
        }

        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function postPasswordResetAPI(verificationCode, password, passwordRepeat, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const customAxios = axios.create({
        baseURL: getAPIBaseURL(),
        headers: {
            'Content-Type': 'application/json;',
            'Accept': 'application/json',
        },
    });

    customAxios.post(NONPROFITVAULT_PASSWORD_RESET_API_ENDPOINT, {verification_code: verificationCode, password: password, password_repeated: passwordRepeat}).then((successResponse) => {
        console.log("postForgotPasswordAPI: Success")
        onSuccessCallback(); // Return the callback data.
    }).catch( (exception) => {
        let responseData = null;
        if (exception.response !== undefined && exception.response !== null) {
            if (exception.response.data !== undefined && exception.response.data !== null) {
                responseData = exception.response.data;
            } else {
                responseData = exception.response;
            }
        } else {
            responseData = exception;
        }
        let errors = camelizeKeys(responseData);

        // Check for incorrect password and enter our own custom error.
        let errorsStr = JSON.stringify(errors);
        if (errorsStr.includes("Incorrect email or password")) { // NOTE: This is the exact error from backend on incorrect email/pass.
            errors = {
                "auth": "Incorrect email or password",
            };
        }

        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function postExecutiveVisitsTenant(tenantID, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();

    const data = {
        tenant_id: tenantID,
    };
    axios.post(NONPROFITVAULT_EXECUTIVE_VISITS_TENANT_API_ENDPOINT, data).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function getDashboardAPI(onSuccessCallback, onErrorCallback, onDoneCallback, onUnauthorizedCallback) {
    const customAxios = getCustomAxios(onUnauthorizedCallback);

    customAxios.get(NONPROFITVAULT_DASHBOARD_API_ENDPOINT).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}
