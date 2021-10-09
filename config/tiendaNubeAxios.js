import axios from 'axios';

const tiendaNubeAxios = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
	// headers: { Authentication: process.env.NEXT_PUBLIC_TIENDA_NUBE_API_KEY },
});

export default tiendaNubeAxios;
