import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const HeadTabla = (props) => {
	const { columnas } = props;

	return (
		<TableHead>
			<TableRow>
				{columnas.map((columna) => (
					<StyledTableCell key={columna.id} align={columna.alineacion}>
						{columna.nombre}
					</StyledTableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

export default HeadTabla;
