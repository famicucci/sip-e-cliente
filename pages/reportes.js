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
		padding: theme.spacing(2),
		color: theme.palette.text.secondary,
	},
	gridPadre: {
		height: 200,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
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
						<Grid
							container
							direction="column"
							justify="center"
							alignItems="stretch"
							style={{ height: '100%' }}
							spacing={0}
						>
							<Grid item>
								<Box bgcolor="grey.300" className={classes.gridPadre}>
									<Typography variant="h6" align="center">
										Height 25%
									</Typography>
								</Box>
							</Grid>
							<Grid item>
								<Box bgcolor="grey.300" className={classes.gridPadre}>
									<Typography variant="h6" align="center">
										Height 25%
									</Typography>
								</Box>
							</Grid>
						</Grid>
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
