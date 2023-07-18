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
	UPDATE_USER_BEGIN,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_ERROR,
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

	// Axios custom instance
	const authFetch = axios.create({
		baseURL: '/api/v1',
	});

	// Request interceptor
	authFetch.interceptors.request.use(
		(config) => {
			config.headers['Authorization'] = `Bearer ${state.token}`;
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	// Response interceptor
	authFetch.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			if (error.response.status === 401) {
				logout();
			}
			return Promise.reject(error);
		}
	);

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

	const updateUser = async (currentUser) => {
		dispatch({ type: UPDATE_USER_BEGIN });
		try {
			const { data } = await authFetch.patch('/auth/updateUser', currentUser);
			const { user, location, token } = data;
			dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, location, token } });
			addUserToLocalStorage({ user, location, token });
			clearAlertDelayEffect();
		} catch (error) {
			if (error.response.status !== 401) {
				dispatch({ type: UPDATE_USER_ERROR, payload: { message: error.response.data.message } });
			}
		}
	};

	return (
		<AppContext.Provider value={{ ...state, displayAlert, clearAlert, setupUser, toggleSidebar, logout, updateUser }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
};

export { AppProvider, initialState };
