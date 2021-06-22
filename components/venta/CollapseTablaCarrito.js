import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablaOrigenCarr from './TablaOrigenCarr';

const CollapseTablaCarrito = ({ open, origen, codigoProducto, direccion }) => {
	return (
		<TableRow>
			<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
				<Collapse in={open} timeout="auto" unmountOnExit>
					{origen && codigoProducto ? (
						<TablaOrigenCarr origen={origen} codigoProducto={codigoProducto} />
					) : null}
					{direccion ? direccion.value : null}
				</Collapse>
			</TableCell>
		</TableRow>
	);
};

export default CollapseTablaCarrito;
