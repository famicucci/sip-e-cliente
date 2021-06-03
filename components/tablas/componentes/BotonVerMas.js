import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const BotonVerMas = () => {
	return (
		<IconButton size="small">
			<ArrowDropDownIcon aria-label="Ver más" />
		</IconButton>
	);
};

export default BotonVerMas;
