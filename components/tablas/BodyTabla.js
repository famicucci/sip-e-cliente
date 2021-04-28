import React, { useEffect } from 'react';
import TableBody from '@material-ui/core/TableBody';
import Fila from './Fila';
import usePaginacion from '../../hooks/usePaginacion';

const BodyTabla = (props) => {
	const { filas } = props;

	const [FooterTabla, filasVacias, cortePagina, setPage] = usePaginacion(filas);

	useEffect(() => {
		setPage(0);
	}, [filas]);

	return (
		<>
			<TableBody>
				{cortePagina.map((fila) => (
					<Fila key={fila.id} fila={fila} />
				))}
				{filasVacias}
			</TableBody>
			<FooterTabla />
		</>
	);
};

export default BodyTabla;
