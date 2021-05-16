import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Copyright from './Copyright';
import Alerta from '../components/Alerta';
import AuthContext from '../context/autenticacion/authContext';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function Login() {
	const classes = useStyles();
	const [usuario, setUsuario] = useState({
		nombreUsuario: '',
		password: '',
	});
	const [alerta, setAlerta] = useState(false);

	const authContext = useContext(AuthContext);
	const { iniciarSesion } = authContext;

	// extraer de usuario
	const { nombreUsuario, password } = usuario;

	const onChange = (e) => {
		setUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		});
		setAlerta(false);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		// Validar que no haya campos vacíos
		if (nombreUsuario.trim() === '' || password.trim() === '') {
			setAlerta(true);
			return;
		}

		setAlerta(false);

		// Pasarlo al action
		iniciarSesion({ usuario: nombreUsuario, password: password });
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sip-e
				</Typography>
				<form className={classes.form} noValidate onSubmit={onSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="nombreUsuario"
						label="Usuario"
						name="nombreUsuario"
						autoComplete="nombreUsuario"
						autoFocus
						value={nombreUsuario}
						onChange={onChange}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Contraseña"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={onChange}
					/>

					{alerta ? <Alerta msj="Coloque usuario y contraseña" /> : null}

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Ingresar
					</Button>
					<Grid container>
						{/* <Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid> */}
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}

export default Login;
