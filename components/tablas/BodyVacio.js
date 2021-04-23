import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const BodyVacio = () => {
	return (
		<TableBody>
			<TableRow style={{ height: 53 }}>
				<TableCell align="center" colSpan={6}>
					No hay datos que mostrar
				</TableCell>
			</TableRow>
		</TableBody>
	);
};

export default BodyVacio;
