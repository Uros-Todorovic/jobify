import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';
import emptyFieldChecker from '../utils/emptyFieldChecker.js';
import Job from '../models/Job.js';

const createJob = async (req, res) => {
	const jobProperties = [req.body?.position, req.body?.company];
	emptyFieldChecker(jobProperties);
	req.body.createdBy = req.user.userId;
	const job = await Job.create(req.body);
	res.status(StatusCodes.CREATED).json(job);
};
const getAllJobs = async (req, res) => {
	const jobs = await Job.find({ createdBy: req.user.userId });
	res.status(StatusCodes.OK).json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

const deleteJob = async (req, res) => {
	res.status(200).send('Delete job controller');
};

const updateJob = async (req, res) => {
	res.status(200).send('Update job controller');
};

const showStats = async (req, res) => {
	res.status(200).send('Show stats jobs controller');
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
