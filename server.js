import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// DB
import connectDB from './db/connect.js';

// Midleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

app.get('/', (req, res) => {
	//throw new Error('Error string from throwing NEW ERROR');
	res.send('Wellcome');
});

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL);
		app.listen(port, () => {
			console.log(`App listening on port ${port}!`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();