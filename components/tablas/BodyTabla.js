import React, { useEffect } from 'react';
import TableBody from '@material-ui/core/TableBody';
import Fila from './Fila';
import usePaginacion from '../../hooks/usePaginacion';
import BodyVacio from './BodyVacio';

const BodyTabla = (props) => {
	const { filas, cantColumnas } = props;

	const [FooterTabla, filasVacias, cortePagina, setPage] = usePaginacion(filas);

	useEffect(() => {
		setPage(0);
	}, [filas]);

	return (
		<>
			{cortePagina.length !== 0 ? (
				<>
					<TableBody>
						{cortePagina.map((fila) => (
							<Fila key={fila.id} fila={fila} />
						))}
						{filasVacias}
					</TableBody>
					<FooterTabla />
				</>
			) : (
				<BodyVacio cantColumnas={cantColumnas} />
			)}
		</>
	);
};

export default BodyTabla;
