import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const BodyVacio = (props) => {
	const { cantColumnas } = props;

	return (
		<TableBody>
			<TableRow style={{ height: 53 }}>
				<TableCell align="center" colSpan={cantColumnas}>
					No hay datos que mostrar
				</TableCell>
			</TableRow>
		</TableBody>
	);
};

export default BodyVacio;
