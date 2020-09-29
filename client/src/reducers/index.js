import { combineReducers } from 'redux';
import userReducer from './userReducer';

export default getUsers({
    users: userReducer
});