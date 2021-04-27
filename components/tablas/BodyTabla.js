import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import Fila from './Fila';
import usePaginacion from '../../hooks/usePaginacion';

const BodyTabla = (props) => {
	const [FooterTabla, filasVacias, cortePagina] = usePaginacion(props.filas);

	return (
		<TableBody>
			{cortePagina.map((fila) => (
				<Fila fila={fila} />
			))}
			{filasVacias}
		</TableBody>
	);
};

export default BodyTabla;
