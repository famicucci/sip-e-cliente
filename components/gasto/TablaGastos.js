import React, { useContext, useEffect } from 'react';
import GastoContext from '../../context/gasto/GastoContext';

const TablaGastos = () => {
	const { getExpenses } = useContext(GastoContext);

	useEffect(() => {
		getExpenses();
	}, []);

	return <h1>Desde tabla gastos</h1>;
};

export default TablaGastos;
