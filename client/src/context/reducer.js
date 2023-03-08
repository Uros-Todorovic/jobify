const reducer = (state, action) => {
	if (action.type === 'SHOW_ALERT') {
		return {
			...state,
			showAlert: true,
			alertType: 'danger',
			alertText: 'Please provide all values!',
		};
	}
	if (action.type === 'CLEAR_ALERT') {
		return {
			...state,
			showAlert: false,
			alertType: '',
			alertText: '',
		};
	}
	throw new Error(`No such action: ${action}`);
};

export default reducer;
