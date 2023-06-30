import { BadRequestError } from '../errors/index.js';

const emptyFieldChecker = (properties = []) => {
	if (properties.some((property) => property === '' || property === undefined)) {
		throw new BadRequestError('Please provide all values.');
	}
};

export default emptyFieldChecker;
