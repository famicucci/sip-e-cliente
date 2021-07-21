import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(5),
	},
	texto: {
		fontSize: '17px',
	},
	textoConBoton: {
		fontSize: '17px',
		marginLeft: theme.spacing(1),
	},
}));

const ImporteFlexGrow = (props) => {
	const classes = useStyles();

	const { titulo, children, funcContenido, childrenNumDecimal } = props;

	return (
		<Box
			display="flex"
			p={1}
			bgcolor="background.paper"
			className={classes.root}
		>
			<Box flexGrow={1}>
				<Typography className={classes.texto} variant="overline">
					{`${titulo}:`}
				</Typography>
			</Box>
			<Box>
				{funcContenido ? funcContenido : null}
				{childrenNumDecimal ? (
					<Typography className={classes.textoConBoton} variant="overline">
						{new Intl.NumberFormat('de-De', {
							style: 'decimal',
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						}).format(children)}
					</Typography>
				) : (
					children
				)}
			</Box>
		</Box>
	);
};

export default ImporteFlexGrow;
