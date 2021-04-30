import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { BarraHerramientasContext } from '../../context/BarraHerramientasContext';
import BodyTabla from './componentes/BodyTabla';
import HeadTabla from './componentes/HeadTabla';

const useStyles = makeStyles({
	table: {
		minWidth: 500,
	},
});

// columnas de la tabla
const columnas = [
	{ id: 1, nombre: 'Código' },
	{ id: 2, nombre: 'Descripción' },
	{ id: 3, nombre: 'Precio ($)' },
];

const cantColumnas = columnas.length;

// datos de la tabla
function createData(id, codigo, descripcion, precio, idListaPrecio) {
	return { id, codigo, descripcion, precio, idListaPrecio };
}
const rows = [
	createData(
		'1',
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		(2497).toFixed(2),
		1
	),
	createData(
		'2',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		(3245).toFixed(2),
		1
	),
	createData(
		'3',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		(4060).toFixed(2),
		1
	),
	createData(
		'4',
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		(3124).toFixed(2),
		1
	),
	createData(
		'5',
		'VV000000094',
		'CORREA Y COLLAR CHICA - AMARILLA - S',
		(1300).toFixed(2),
		1
	),
	createData(
		'6',
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		(2497).toFixed(2),
		1
	),
	createData(
		'7',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		(3245).toFixed(2),
		1
	),
	createData(
		'8',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		(4060).toFixed(2),
		1
	),
	createData(
		'9',
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		(3124).toFixed(2),
		1
	),
	createData(
		'10',
		'VV000100054',
		'CORREA Y COLLAR CHICA - AMARILLA - S',
		(1300).toFixed(2),
		1
	),
	createData(
		'11',
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		(2497).toFixed(2),
		1
	),
	createData(
		'12',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		(3245).toFixed(2),
		1
	),
	createData(
		'13',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		(4060).toFixed(2),
		1
	),
	createData(
		'14',
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		(3124).toFixed(2),
		1
	),
	createData(
		'15',
		'VV000000014',
		'CORREA Y COLLAR CHICA - AMARILLA - S',
		(1300).toFixed(2),
		1
	),
	createData(
		'16',
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		(2497).toFixed(2),
		1
	),
	createData(
		'17',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		(3245).toFixed(2),
		1
	),
	createData(
		'18',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		(4060).toFixed(2),
		1
	),
	createData(
		'19',
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		(3124).toFixed(2),
		1
	),
	createData(
		'20',
		'VV000000053',
		'CORREA Y COLLAR CHICA - AMARILLA - S',
		(1300).toFixed(2),
		1
	),
	createData(
		'21',
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		(2497).toFixed(2),
		1
	),
	createData(
		'22',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		(3245).toFixed(2),
		1
	),
	createData(
		'23',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		(4060).toFixed(2),
		1
	),
	createData(
		'24',
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		(3124).toFixed(2),
		1
	),
	createData(
		'25',
		'VV000000097',
		'CORREA Y COLLAR CHICA - NARANJA - S',
		(1300).toFixed(2),
		1
	),
	createData(
		'26',
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		(249700).toFixed(2),
		2
	),
	createData(
		'27',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		(324500).toFixed(2),
		2
	),
	createData(
		'28',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		(406000).toFixed(2),
		2
	),
	createData(
		'29',
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		(312400).toFixed(2),
		2
	),
	createData(
		'30',
		'VV000000094',
		'CORREA Y COLLAR CHICA - AMARILLA - S',
		(130000).toFixed(2),
		2
	),
	createData(
		'31',
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		(249700).toFixed(2),
		2
	),
	createData(
		'32',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		(324500).toFixed(2),
		2
	),
	createData(
		'33',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		(406000).toFixed(2),
		2
	),
	createData(
		'34',
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		(312400).toFixed(2),
		2
	),
	createData(
		'35',
		'VV000100054',
		'CORREA Y COLLAR CHICA - AMARILLA - S',
		(130000).toFixed(2),
		2
	),
	createData(
		'36',
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		(249700).toFixed(2),
		2
	),
	createData(
		'37',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		(324500).toFixed(2),
		2
	),
	createData(
		'38',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		(406000).toFixed(2),
		2
	),
	createData(
		'39',
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		(312400).toFixed(2),
		2
	),
	createData(
		'40',
		'VV000000014',
		'CORREA Y COLLAR CHICA - AMARILLA - S',
		(130000).toFixed(2),
		2
	),
	createData(
		'41',
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		(249700).toFixed(2),
		2
	),
	createData(
		'42',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		(324500).toFixed(2),
		2
	),
	createData(
		'43',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		(406000).toFixed(2),
		2
	),
	createData(
		'44',
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		(312400).toFixed(2),
		2
	),
	createData(
		'45',
		'VV000000053',
		'CORREA Y COLLAR CHICA - AMARILLA - S',
		(130000).toFixed(2),
		2
	),
	createData(
		'46',
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		(249700).toFixed(2),
		2
	),
	createData(
		'47',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		(324500).toFixed(2),
		2
	),
	createData(
		'48',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		(406000).toFixed(2),
		2
	),
	createData(
		'49',
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		(312400).toFixed(2),
		2
	),
	createData(
		'50',
		'VV000000097',
		'CORREA Y COLLAR CHICA - NARANJA - S',
		(130000).toFixed(2),
		2
	),
	createData(
		'51',
		'VV000110097',
		'CORREA Y COLLAR CHICA - VERDE - S',
		(115015).toFixed(2),
		2
	),
];

const TablaPrecios = () => {
	const classes = useStyles();

	const {
		busqueda,
		lista,
		setBuscador,
		filtrado,
		filtraListaPrecio,
		setSelectListaPrecio,
		setSelectPuntoStock,
	} = useContext(BarraHerramientasContext);

	const [filasListaPrecio, setFilasListaPrecio] = useState(rows);
	const [filas, setFilas] = useState(filasListaPrecio);

	useEffect(() => {
		setBuscador(true);
		setSelectListaPrecio(true);
		setSelectPuntoStock(false);
	}, []);

	useEffect(() => {
		if (busqueda !== '') {
			const nuevasFilas = filtrado(filasListaPrecio, busqueda);
			setFilas(nuevasFilas);
		} else {
			setFilas(filasListaPrecio);
		}
	}, [filasListaPrecio]);

	useEffect(() => {
		let nuevasFilas = filtraListaPrecio(rows, lista);
		setFilasListaPrecio(nuevasFilas);
	}, [lista]);

	useEffect(() => {
		const nuevasFilas = filtrado(filasListaPrecio, busqueda);
		setFilas(nuevasFilas);
	}, [busqueda]);

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table}>
				<HeadTabla columnas={columnas} />
				<BodyTabla cantColumnas={cantColumnas} filas={filas} />
			</Table>
		</TableContainer>
	);
};

export default TablaPrecios;
