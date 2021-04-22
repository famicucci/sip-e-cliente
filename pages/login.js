import React from 'react';
import Layout from '../components/layouts/Layout';
import { Button } from '@material-ui/core';

const Login = () => {
	return (
		<div>
			<Layout>
				<h1>Login</h1>
				<Button variant="contained" color="primary">
					Ingresar
				</Button>
			</Layout>
		</div>
	);
};

export default Login;
