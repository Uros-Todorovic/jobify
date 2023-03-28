import { useState, useEffect } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { FormRow, Logo, Alert } from '../components';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

const initialValues = {
	name: '',
	email: '',
	password: '',
	isMember: false,
};

const Register = () => {
	const { user, isLoading, showAlert, displayAlert, clearAlert, setupUser } = useAppContext();

	const [values, setValues] = useState(initialValues);
	const navigate = useNavigate();

	const toggleMember = () => {
		setValues({ ...values, isMember: !values.isMember });
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		clearAlert();
		const { name, email, password, isMember } = values;
		if (!email || !password || (!isMember && !name)) {
			displayAlert();
			return;
		}
		const currenUser = { name, email, password };
		// Register or login user
		setupUser(currenUser, isMember);
	};

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate('/');
			}, 3000);
		}
	}, [user, navigate]);

	return (
		<Wrapper className="full-page">
			<form className="form" onSubmit={onSubmit}>
				<Logo />
				<h3>{values.isMember ? 'Login' : 'Register'}</h3>
				{showAlert && <Alert />}

				{/* Name Input*/}
				{!values.isMember && <FormRow type="text" name="name" value={values.name} handleChange={handleChange} />}

				{/* Email Input*/}
				<FormRow type="email" name="email" value={values.email} handleChange={handleChange} />

				{/* Password Input*/}
				<FormRow type="password" name="password" value={values.password} handleChange={handleChange} />

				<button type="submit" className="btn btn-block" disabled={isLoading}>
					submit
				</button>
				<p>
					{values.isMember ? 'Not a member yet?' : 'Alredy a member?'}
					<button type="button" className="member-btn" onClick={toggleMember}>
						{values.isMember ? 'Register' : 'Login'}
					</button>
				</p>
			</form>
		</Wrapper>
	);
};

export default Register;
