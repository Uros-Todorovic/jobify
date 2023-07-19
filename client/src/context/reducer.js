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
import { initialState } from './appContext';

const reducer = (state, action) => {
	if (action.type === DISPLAY_ALERT) {
		return {
			...state,
			showAlert: true,
			alertType: 'danger',
			alertText: 'Please provide all values!',
		};
	}
	if (action.type === CLEAR_ALERT) {
		return {
			...state,
			showAlert: false,
			alertType: '',
			alertText: '',
		};
	}

	if (action.type === SETUP_USER_BEGIN) {
		return {
			...state,
			isLoading: true,
		};
	}
	if (action.type === SETUP_USER_SUCCESS) {
		return {
			...state,
			user: action.payload.user,
			token: action.payload.token,
			userLocation: action.payload.location,
			jobLocation: action.payload.location,
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: action.payload.isMember ? 'Login Successful! Redirecting...' : 'User Created! Redirecting...',
		};
	}
	if (action.type === SETUP_USER_ERROR) {
		return {
			...state,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.message,
			isLoading: false,
		};
	}

	if (action.type === TOGGLE_SIDEBAR) {
		return {
			...state,
			showSidebar: !state.showSidebar,
		};
	}

	if (action.type === LOGOUT_USER) {
		return {
			...initialState,
			user: null,
			token: null,
			userLocation: '',
			jobLocation: '',
		};
	}

	if (action.type === UPDATE_USER_BEGIN) {
		return {
			...state,
			isLoading: true,
		};
	}

	if (action.type === UPDATE_USER_SUCCESS) {
		return {
			...state,
			user: action.payload.user,
			token: action.payload.token,
			userLocation: action.payload.location,
			jobLocation: action.payload.location,
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: 'User Profile Updated!',
		};
	}

	if (action.type === UPDATE_USER_ERROR) {
		return {
			...state,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.message,
			isLoading: false,
		};
	}

	if (action.type === HANDLE_CHANGE) {
		return {
			...state,
			[action.payload.name]: action.payload.value,
		};
	}

	if (action.type === CLEAR_VALUES) {
		const initialState = {
			isEditing: false,
			editJobId: '',
			position: '',
			company: '',
			jobLocation: state.userLocation,
			jobType: 'full-time',
			status: 'pending',
		};
		return {
			...state,
			...initialState,
		};
	}

	if (action.type === CREATE_JOB_BEGIN) {
		return {
			...state,
			isLoading: true,
		};
	}

	if (action.type === CREATE_JOB_SUCCESS) {
		return {
			...state,
			showAlert: true,
			alertType: 'success',
			alertText: 'New Job Created!',
			isLoading: false,
		};
	}

	if (action.type === CREATE_JOB_ERROR) {
		return {
			...state,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.message,
			isLoading: false,
		};
	}

	throw new Error(`No such action: ${action}`);
};

export default reducer;
