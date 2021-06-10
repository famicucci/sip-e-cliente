import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const BodyVacio = ({ content, columnas }) => {
	return (
		<TableRow style={{ height: 53 }}>
			<TableCell align="center" colSpan={columnas.length}>
				{content}
			</TableCell>
		</TableRow>
	);
};

export default BodyVacio;
