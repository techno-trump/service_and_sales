import { combineReducers } from 'redux';

import app from './app';
import user from './user';
import systemUsers from './system-users';
import navbar from './navbar';

export default combineReducers({ app, user, systemUsers, navbar });