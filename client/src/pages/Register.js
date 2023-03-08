import { useState, useEffect } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { FormRow, Logo, Alert } from '../components';
import { useAppContext } from '../context/appContext';

const initialValues = {
	name: '',
	email: '',
	password: '',
	isMember: false,
};

const Register = () => {
	const { isLoading, showAlert, displayAlert, clearAlert } = useAppContext();

	const [values, setValues] = useState(initialValues);

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
		console.log(values);
	};

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

				<button type="submit" className="btn btn-block">
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
