import { createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	SETUP_USER_BEGIN,
	SETUP_USER_SUCCESS,
	SETUP_USER_ERROR,
	TOGGLE_SIDEBAR,
	LOGOUT_USER,
} from './actions';
import reducer from './reducer';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const userlLocation = localStorage.getItem('location');

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: '',
	alertType: '',
	user: user ? JSON.parse(user) : null,
	token: token,
	userLocation: userlLocation || '',
	jobLocation: userlLocation || '',
	showSidebar: false,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const addUserToLocalStorage = ({ user, token, location }) => {
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('token', token);
		localStorage.setItem('location', location);
	};

	const removeUserFromLocalStorage = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		localStorage.removeItem('location');
	};

	const displayAlert = () => {
		dispatch({ type: DISPLAY_ALERT });
	};

	const clearAlert = () => {
		dispatch({ type: CLEAR_ALERT });
	};

	const clearAlertDelayEffect = () => {
		setTimeout(clearAlert, 3000);
	};

	const setupUser = async (currentUser, isMember) => {
		dispatch({ type: SETUP_USER_BEGIN });
		try {
			const response = await axios.post(`/api/v1/auth/${isMember ? 'login' : 'register'}`, currentUser);
			const { user, token, location } = response.data;
			dispatch({ type: SETUP_USER_SUCCESS, payload: { user, token, location, isMember } });
			addUserToLocalStorage({ user, token, location });
			clearAlertDelayEffect();
		} catch (error) {
			dispatch({ type: SETUP_USER_ERROR, payload: { message: error.response.data.message } });
		}
	};

	const toggleSidebar = () => {
		dispatch({ type: TOGGLE_SIDEBAR });
	};

	const logout = () => {
		removeUserFromLocalStorage();
		dispatch({ type: LOGOUT_USER });
	};

	return (
		<AppContext.Provider value={{ ...state, displayAlert, clearAlert, setupUser, toggleSidebar, logout }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
};

export { AppProvider, initialState };
