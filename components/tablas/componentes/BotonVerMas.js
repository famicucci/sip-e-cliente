import React, { useContext } from 'react';
import { IconButton } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { BotoneraCarrContext } from '../../../context/BotoneraCarrContext';

const BotonVerMas = () => {
	const { openVerMas, handleVerMas } = useContext(BotoneraCarrContext);
	return (
		<IconButton
			size="medium"
			onClick={() => {
				handleVerMas();
			}}
		>
			{!openVerMas ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
		</IconButton>
	);
};

export default BotonVerMas;
