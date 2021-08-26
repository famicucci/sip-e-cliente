import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layouts/Layout';
import AuthContext from '../context/autenticacion/authContext';
import IrLogin from '../components/generales/IrLogin';
import SpinnerPantalla from '../components/SpinnerPantalla';
import Paper from '@material-ui/core/Paper';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import SeccionInferiorCarrito from '../components/venta/SeccionInferiorCarrito';

const useStyles = makeStyles((theme) => ({
	paper: {
		width: 600,
		height: '86vh',
		padding: theme.spacing(1),
		color: theme.palette.text.secondary,
	},
	container: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	tableContainer: {
		flex: 1,
		minHeight: 0,
	},
	table: {
		minWidth: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	fillExpand: {
		flex: 1,
		minHeight: 0,
		overflowY: 'scroll',
	},
}));

const Reportes = () => {
	const classes = useStyles();

	const [maxVal, setVal] = useState(10);
	const rows = [];
	for (let i = 0; i < maxVal; i++) {
		rows.push({
			key: i,
			name: `Placeholder Name ${i}`,
			age: 30 + i,
			address: `London, Park Lane no. ${i}`,
		});
	}

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
			<Paper className={classes.paper} variant="outlined">
				<div className={classes.container}>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {
							setVal(maxVal + 10);
						}}
					>
						Get Users
					</Button>
					<TableContainer className={classes.tableContainer} component={Paper}>
						<Table className={classes.table} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell align="right">Age</TableCell>
									<TableCell align="right">Address</TableCell>
								</TableRow>
							</TableHead>
							<TableBody className={classes.fillExpand}>
								{rows.map((row) => (
									<TableRow key={row.name}>
										<TableCell component="th" scope="row">
											{row.name}
										</TableCell>
										<TableCell align="right">{row.age}</TableCell>
										<TableCell align="right">{row.address}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<SeccionInferiorCarrito />
				</div>
			</Paper>
		</Layout>
	);
};

export default Reportes;
