import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';

const register = async (req, res) => {
	const user = await User.create(req.body);
	res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
	res.status(200).send('Login controller');
};

const updateUser = async (req, res) => {
	res.status(200).send('Update User controller');
};

export { register, login, updateUser };
