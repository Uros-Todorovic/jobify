import { createContext, useContext, useReducer } from 'react';
import { DISPLAY_ALERT, CLEAR_ALERT } from './actions';
import reducer from './reducer';

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: '',
	alertType: '',
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

	return <AppContext.Provider value={{ ...state, displayAlert, clearAlert }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
	return useContext(AppContext);
};

export { AppProvider, initialState };
