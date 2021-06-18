import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: '100%',
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
}));

const BuscarProducto = (props) => {
	const classes = useStyles();

	const { busqueda, handleBusqueda } = useContext(BarraHerramientasContext);

	const onChange = (event) => {
		handleBusqueda(event.target.value);
	};

	const onClick = () => {
		handleBusqueda('');
	};

	return (
		<Paper component="form" className={classes.root} style={{ ...props.style }}>
			<IconButton className={classes.iconButton}>
				<SearchIcon />
			</IconButton>
			<InputBase
				className={classes.input}
				value={busqueda}
				onChange={onChange}
				placeholder="Producto..."
			/>
			<IconButton className={classes.iconButton} onClick={onClick}>
				<ClearIcon />
			</IconButton>
		</Paper>
	);
};

export default BuscarProducto;
