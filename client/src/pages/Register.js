import { useState, useEffect } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { FormRow, Logo, Alert } from '../components';

const initialValues = {
	name: '',
	email: '',
	password: '',
	isMember: false,
	showAlert: false,
};

const Register = () => {
	const [values, setValues] = useState(initialValues);

	const toggleMember = () => {
		setValues({ ...values, isMember: !values.isMember });
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(values);
	};

	return (
		<Wrapper className="full-page">
			<form className="form" onSubmit={onSubmit}>
				<Logo />
				<h3>{values.isMember ? 'Login' : 'Register'}</h3>
				{values.showAlert && <Alert />}

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
