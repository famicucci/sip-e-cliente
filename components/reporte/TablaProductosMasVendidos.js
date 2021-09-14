import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FilaProductosMasVendidos from './FilaProductosMasVendidos';
import moment from 'moment';

const columnas = [
	{ id: 'codigo', label: 'Código', minWidth: 20, align: 'left' },
	{ id: 'descripcion', label: 'Descripción', minWidth: 100, align: 'left' },
	{ id: 'cantidad', label: 'Cantidad', minWidth: 50, align: 'center' },
	{
		id: 'facturacion',
		label: 'Facturación\u00a0($)',
		minWidth: 50,
		align: 'center',
	},
];

const useStyles = makeStyles({
	tableContainer: {
		flex: 1,
		minHeight: 0,
	},
});

const TablaProductosMasVendidos = () => {
	const classes = useStyles();
	const { startDate, endDate, invoices, getInvoicing } =
		useContext(GlobalDataContext);

	const [data, setData] = useState([]);

	useEffect(() => {
		if (invoices.length === 0) getInvoicing(startDate, endDate);
	}, []);

	useEffect(() => {
		if (invoices.length > 0) getDataTable(invoices, startDate, endDate);
	}, [invoices, startDate, endDate]);

	const getDataTable = (invoices, startDate, endDate) => {
		// filter by date
		// console.log(moment(startDate).format('YYYY-MM-DDTHH:mm:ss.SSSSZ'));
		// console.log(moment(endDate).format('YYYY-MM-DDTHH:mm:ss.SSSSZ'));
		// console.log(invoices);
		// console.log(
		// 	moment(invoices[0]['createdAt']).format('YYYY-MM-DDTHH:mm:ss.SSSSZ')
		// );
		// console.log(
		// 	moment(invoices[0]['createdAt']).format('YYYY-MM-DDTHH:mm:ss.SSSSZ')
		// );

		const filteredIvoices = invoices.filter(
			(x) =>
				moment(startDate).format('YYYY-MM-DDTHH:mm:ss.SSSSZ') <
					moment(x.createdAt).format('YYYY-MM-DDTHH:mm:ss.SSSSZ') &&
				moment(x.createdAt).format('YYYY-MM-DDTHH:mm:ss.SSSSZ') <
					moment(endDate).format('YYYY-MM-DDTHH:mm:ss.SSSSZ') &&
				x.tipo === 'fac' &&
				x.estado !== 'c' &&
				x.estadoPago === 'Pago'
		);

		console.log(filteredIvoices);
	};

	// useEffect(() => {
	// 	if (invoices.length === 0) getInvoicing(startDate, endDate);
	// 	console.log(invoices);
	// }, [invoices, startDate, endDate]);

	return (
		<TableContainer className={classes.tableContainer} component={Paper}>
			<Table aria-label="sticky table">
				<TableHead>
					<TableRow>
						{columnas.map((columna) => (
							<TableCell
								key={columna.id}
								align={columna.align}
								style={{ minWidth: columna.minWidth }}
							>
								{columna.label}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					<FilaProductosMasVendidos
						fila={{ ProductoCodigo: 'CO34567ASDFGT', pu: '6754' }}
					/>
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TablaProductosMasVendidos;
