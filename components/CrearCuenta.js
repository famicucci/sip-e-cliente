import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Copyright from './Copyright';
import PersonIcon from '@material-ui/icons/Person';

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

function CrearCuenta() {
	const classes = useStyles();
	const [usuario, setUsuario] = useState({
		email: '',
		nombreUsuario: '',
		password: '',
		confirmar: '',
	});

	// extraer de usuario
	const { email, nombreUsuario, password, confirmar } = usuario;

	const onChange = (e) => {
		setUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();

		// Validar que no haya campos vacíos

		// Password mínimo de 6 caractéres

		// Revisar que los dos passwords sean iguales

		// Pasarlo al action
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<PersonIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Crea una cuenta en Sip-e
				</Typography>
				<form className={classes.form} noValidate onSubmit={onSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email"
						name="email"
						autoComplete="email"
						autoFocus
						value={email}
						onChange={onChange}
					/>
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
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="confirmar"
						label="Confirmar contraseña"
						type="password"
						id="confirmar"
						value={confirmar}
						onChange={onChange}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Registrarse
					</Button>
					<Grid container>
						{/* <Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid> */}
						<Grid item>
							<Link href="/" variant="body2">
								{'Ya tienes una cuenta? Iniciar Sesión'}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}

export default CrearCuenta;
