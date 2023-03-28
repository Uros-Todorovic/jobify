import { createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import { DISPLAY_ALERT, CLEAR_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR } from './actions';
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

	const registerUser = async (currentUser) => {
		dispatch({ type: REGISTER_USER_BEGIN });
		try {
			const response = await axios.post('/api/v1/auth/register', currentUser);
			const { user, token, location } = response.data;
			dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token, location } });
			addUserToLocalStorage({ user, token, location });
			clearAlertDelayEffect();
		} catch (error) {
			dispatch({ type: REGISTER_USER_ERROR, payload: { message: error.response.data.message } });
		}
	};

	return (
		<AppContext.Provider value={{ ...state, displayAlert, clearAlert, registerUser }}>{children}</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
};

export { AppProvider, initialState };
