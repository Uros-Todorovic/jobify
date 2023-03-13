const register = async (req, res) => {
	res.status(200).send('Register controller');
};

const login = async (req, res) => {
	res.status(200).send('Login controller');
};

const updateUser = async (req, res) => {
	res.status(200).send('Update User controller');
};

export { register, login, updateUser };
