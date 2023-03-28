import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import morgan from 'morgan';

const app = express();
dotenv.config();
app.use(express.json());
if (process.env.NODE !== 'production') {
	app.use(morgan('dev'));
}

// DB
import connectDB from './db/connect.js';

// Midleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

// Routers
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobRoutes.js';

// Routes
//Starter Route
app.get('/api/v1', (req, res) => {
	res.json({ message: 'Wellcome from JOBIFY API' });
});
// Auth Route
app.use('/api/v1/auth', authRouter);
// Jobs Route
app.use('/api/v1/jobs', jobsRouter);
// Not Foud
app.use(notFoundMiddleware);
// Error Handler
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
