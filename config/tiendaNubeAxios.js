import axios from 'axios';

const tiendaNubeAxios = axios.create({
	baseURL: 'http://localhost:3000',
});

export default tiendaNubeAxios;
