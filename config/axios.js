import axios from 'axios';

const clienteAxios = axios.create({
	baseURL: ProcessingInstruction.env.NEXT_PUBLIC_BACKEND_URL,
});

export default clienteAxios;
