const createJob = async (req, res) => {
	res.status(200).send('Create job controller');
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
