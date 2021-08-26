import React, { useContext } from 'react';
import BotonFilaTabla from '../generales/BotonFilaTabla';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ClientesContext from '../../context/clientes/clientesContext';

const BotonNuevoCliente = () => {
	const { handleOpenModalNuevoCliente } = useContext(ClientesContext);
	return (
		<BotonFilaTabla
			contenido={<PersonAddIcon />}
			onClick={() => {
				handleOpenModalNuevoCliente(true);
			}}
			style={{ color: '#fff' }}
		/>
	);
};

export default BotonNuevoCliente;
