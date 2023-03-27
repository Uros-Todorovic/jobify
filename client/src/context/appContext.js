import { createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import { DISPLAY_ALERT, CLEAR_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR } from './actions';
import reducer from './reducer';

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: '',
	alertType: '',
	user: null,
	token: null,
	userLocation: '',
	jobLocation: '',
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

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
			clearAlertDelayEffect();
		} catch (error) {
			console.log(error.response);
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
