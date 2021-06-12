import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

const BotonVerMasCarrito = ({ setOpen, open }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<IconButton
				size="small"
				onClick={() => {
					setOpen(!open);
				}}
			>
				{!open ? (
					<ArrowDropDownIcon fontSize="default" fontSize="small" />
				) : (
					<ArrowDropUpIcon fontSize="default" fontSize="small" />
				)}
			</IconButton>
		</div>
	);
};

export default BotonVerMasCarrito;
