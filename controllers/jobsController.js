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

const deleteJob = async (req, res) => {
	res.status(200).send('Delete job controller');
};

const getAllJobs = async (req, res) => {
	res.status(200).send('Get all jobs User controller');
};

const updateJob = async (req, res) => {
	res.status(200).send('Update job controller');
};

const showStats = async (req, res) => {
	res.status(200).send('Show stats jobs controller');
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
