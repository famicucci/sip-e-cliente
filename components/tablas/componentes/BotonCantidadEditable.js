import React, { useContext } from 'react';
// import { CantidadEditableContext } from '../../../context/CantidadEditableContext';
import BotonEditar from './BotonEditar';
import BotonConfirmarCancelar from './BotonConfirmarCancelar';
import CantEditableContext from '../../../context/celdasEditables/cantEditable/cantEditableContext';

const BotonCantidadEditable = ({ fila }) => {
	const { filaActiva } = useContext(CantEditableContext);

	return (
		<>
			{filaActiva.id !== fila.id ? (
				<BotonEditar fila={fila} />
			) : (
				<BotonConfirmarCancelar fila={fila} />
			)}
		</>
	);
};

export default BotonCantidadEditable;
