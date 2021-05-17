import '../styles/globals.css';
import BarraHerramientasProvider from '../context/BarraHerramientasContext';
import MenuProvider from '../context/MenuContext';
import AuthState from '../context/autenticacion/authState';
import tokenAuth from '../config/token';

// Revisar si tenemos un token
// if (typeof window !== 'undefined') {
// const token = localStorage.getItem('token');

// if (token) {
// 	tokenAuth(token);
// }
// }

function MyApp({ Component, pageProps }) {
	return (
		<AuthState>
			<MenuProvider>
				<BarraHerramientasProvider>
					<Component {...pageProps} />
				</BarraHerramientasProvider>
			</MenuProvider>
		</AuthState>
	);
}

export default MyApp;
