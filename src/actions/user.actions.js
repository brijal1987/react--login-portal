import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
// import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    register
};

async function login(username, password) {
    try {
        var result = await userService.login(username, password);
        const data = {
            success:1,
            result: result
        }
        return data;
    }
    catch (err) {
        const data = {
            error:1,
            err: err
        }
        return data;
    }

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    // complete this function
    function success() { return { type: userConstants.LOGOUT } }

}

async function register(user) {
    // return the promise using fetch which dispatches appropriately

    try {
        var result = await userService.register(user);
        const data = {
            success:1,
            result: result
        }
        return data;
    }
    catch (err) {
        const data = {
            error:1,
            err: err
        }
        return data;
    }

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
