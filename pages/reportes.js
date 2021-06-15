import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layouts/Layout';
import AuthContext from '../context/autenticacion/authContext';
import IrLogin from '../components/IrLogin';
import SpinnerPantalla from '../components/SpinnerPantalla';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	paper: {
		height: '86vh',
		padding: theme.spacing(1),
		color: theme.palette.text.secondary,
	},
	boxPadre: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	box2: {
		flexGrow: 1,
		marginTop: 10,
	},
	box1: {
		height: 150,
	},
}));

const Reportes = () => {
	const classes = useStyles();

	const authContext = useContext(AuthContext);
	const { autenticado, cargando, usuarioAutenticado } = authContext;

	useEffect(() => {
		usuarioAutenticado();
	}, []);

	if (!autenticado && cargando) {
		return <SpinnerPantalla />;
	}

	if (!autenticado && !cargando) {
		return <IrLogin />;
	}

	return (
		<Layout>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<Paper className={classes.paper} variant="outlined">
						<Box className={classes.boxPadre}>
							<Box bgcolor="grey.300" className={classes.box1}>
								<Typography variant="h6" align="center">
									Box 1
								</Typography>
							</Box>
							<Box bgcolor="grey.300" className={classes.box2}>
								<Typography variant="h6" align="center">
									Box 2
								</Typography>
							</Box>
						</Box>
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper className={classes.paper} variant="outlined">
						xs=6
					</Paper>
				</Grid>
			</Grid>
		</Layout>
	);
};

export default Reportes;
