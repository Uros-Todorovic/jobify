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
	HANDLE_CHANGE,
	CLEAR_VALUES,
	CREATE_JOB_BEGIN,
	CREATE_JOB_SUCCESS,
	CREATE_JOB_ERROR,
	GET_JOBS_BEGIN,
	GET_JOBS_SUCCESS,
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
	showSidebar: false,
	isEditing: false,
	editJobId: '',
	position: '',
	company: '',
	jobLocation: userlLocation || '',
	jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
	jobType: 'full-time',
	statusOptions: ['interview', 'declined', 'pending'],
	status: 'pending',
	jobs: [],
	totalJobs: 0,
	numOfPages: 1,
	page: 1,
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

	const handleChange = ({ name, value }) => {
		dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
	};

	const clearValues = () => {
		dispatch({ type: CLEAR_VALUES });
	};

	const createJob = async () => {
		dispatch({ type: CREATE_JOB_BEGIN });
		try {
			const { position, company, jobLocation, jobType, status } = state;
			await authFetch.post('/jobs', { position, company, jobLocation, jobType, status });
			dispatch({ type: CREATE_JOB_SUCCESS });
			dispatch({ type: CLEAR_VALUES });
		} catch (error) {
			if (error.response.status !== 401) {
				dispatch({ type: CREATE_JOB_ERROR, payload: { message: error.response.data.message } });
			}
		}
		clearAlertDelayEffect();
	};

	const getJobs = async () => {
		let url = `/jobs`;

		dispatch({ type: GET_JOBS_BEGIN });
		try {
			const { data } = await authFetch.get(url);
			const { jobs, totalJobs, numOfPages } = data;
			dispatch({ type: GET_JOBS_SUCCESS, payload: { jobs, totalJobs, numOfPages } });
		} catch (error) {
			logout();
			console.log(error.response);
		}
		clearAlert();
	};
	const setEditJob = (id) => {
		console.log(`set edit job : ${id}`);
	};

	const deleteJob = (id) => {
		console.log(`delete job : ${id}`);
	};

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				clearAlert,
				setupUser,
				toggleSidebar,
				logout,
				updateUser,
				handleChange,
				clearValues,
				createJob,
				getJobs,
				setEditJob,
				deleteJob,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
};

export { AppProvider, initialState };
