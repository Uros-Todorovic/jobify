import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
	console.log(err);
	const defaultError = {
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		message: err.message || 'Something went wrong, please try again later.',
	};
	// Mongoose Error
	if (err.name === 'ValidationError') {
		defaultError.statusCode = StatusCodes.BAD_REQUEST;
		defaultError.message = Object.values(err.errors)
			.map((error) => error.message)
			.join(', ');
	}
	if (err.code && err.code === 11000) {
		defaultError.statusCode = StatusCodes.BAD_REQUEST;
		defaultError.message = `${Object.keys(err.keyValue)} has to be unique`;
	}
	res.status(defaultError.statusCode).json({ message: defaultError.message });
};

export default errorHandlerMiddleware;
