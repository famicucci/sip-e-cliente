import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';

import usePaginacion from '../../hooks/usePaginacion';
import BodyVacio from './BodyVacio';

// para encabezado
const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

// datos de la tabla
function createData(codigo, descripcion, precio) {
	return { codigo, descripcion, precio };
}

const rows = [];

const useStyles2 = makeStyles({
	table: {
		minWidth: 500,
	},
});

const TablaPrecios = () => {
	const [FooterTabla, filasVacias, cortePagina] = usePaginacion(rows);

	const classes = useStyles2();

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<StyledTableCell>Código</StyledTableCell>
						<StyledTableCell align="left">Descripción</StyledTableCell>
						<StyledTableCell align="center">Precio&nbsp;($)</StyledTableCell>
					</TableRow>
				</TableHead>
				{rows.length !== 0 ? (
					<TableBody>
						{cortePagina.map((row) => (
							<StyledTableRow key={row.codigo}>
								<TableCell component="th" scope="row">
									{row.codigo}
								</TableCell>
								<TableCell align="left">{row.descripcion}</TableCell>
								<TableCell align="right">{row.precio}</TableCell>
							</StyledTableRow>
						))}

						{filasVacias}
					</TableBody>
				) : (
					<BodyVacio />
				)}
				<FooterTabla />
			</Table>
		</TableContainer>
	);
};

export default TablaPrecios;
