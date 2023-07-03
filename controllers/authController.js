import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';
import emptyFieldChecker from '../utils/emptyFieldChecker.js';
import User from '../models/User.js';

const register = async (req, res) => {
	// Empty values
	const registerProperties = [req.body?.name, req.body?.password, req?.body.email];
	emptyFieldChecker(registerProperties);

	// Check for unique email
	const { name, email, password } = req.body;
	const userAlredyExists = await User.findOne({ email });
	if (userAlredyExists) {
		throw new BadRequestError('User alredy exists.');
	}
	const user = await User.create({ name, email, password });
	// Creating JSON web token
	const token = user.createJWT();
	res.status(StatusCodes.CREATED).json({
		user: { email: user.email, lastName: user.lastName, name: user.name, location: user.location },
		token,
		location: user.location,
	});
};

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new BadRequestError('Please provide all values');
	}
	const user = await User.findOne({ email }).select('+password');
	if (!user) {
		throw new UnAuthenticatedError('Invalid credentials');
	}
	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new UnAuthenticatedError('Invalid credentials');
	}
	// Creating JSON web token
	const token = user.createJWT();
	user.password = undefined;
	res.status(StatusCodes.OK).json({
		user,
		token,
		location: user.location,
	});
};

const updateUser = async (req, res) => {
	const updateProperties = [req.body?.email, req.body?.name, req?.body.lastName, req?.body?.location];
	emptyFieldChecker(updateProperties);

	const { email, name, lastName, location } = req.body;

	const user = await User.findOne({ _id: req.user.userId });

	if (!user) {
		throw new BadRequestError('No user found');
	}

	user.name = name;
	user.lastName = lastName;
	user.email = email;
	user.location = location;

	await user.save();

	const token = user.createJWT();
	res.status(StatusCodes.OK).json({
		user,
		token,
		location: user.location,
	});
};

export { register, login, updateUser };
