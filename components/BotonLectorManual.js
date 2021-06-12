import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import CropFreeIcon from '@material-ui/icons/CropFree';

const useStyles = makeStyles((theme) => ({
	root: {
		marginLeft: theme.spacing(2),
	},
	boton: {
		color: theme.palette.common.white,
	},
}));

const BotonLectorManual = () => {
	const classes = useStyles();
	const [modo, setModo] = React.useState('manual');

	const handleChange = (event, nuevoModo) => {
		setModo(nuevoModo);
	};

	return (
		<div className={classes.root}>
			<ToggleButtonGroup
				size="small"
				value={modo}
				exclusive
				onChange={handleChange}
			>
				<ToggleButton value="manual">
					<SpellcheckIcon fontSize="small" className={classes.boton} />
				</ToggleButton>

				<ToggleButton value="lector">
					<CropFreeIcon fontSize="small" className={classes.boton} />
				</ToggleButton>
			</ToggleButtonGroup>
		</div>
	);
};

export default BotonLectorManual;
