import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import { IconButton } from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

const BotonElegirPtoStock = ({ cantidad }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Badge
				color="default"
				badgeContent={cantidad}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				showZero
			>
				<IconButton size="small" color="secondary">
					<CallMadeIcon fontSize="default" />
				</IconButton>
			</Badge>
		</div>
	);
};

export default BotonElegirPtoStock;
