import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
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
	res.status(defaultError.statusCode).json({ message: defaultError.message });
};

export default errorHandlerMiddleware;
