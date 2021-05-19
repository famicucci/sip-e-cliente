import '../styles/globals.css';
import BarraHerramientasProvider from '../context/BarraHerramientasContext';
import MenuProvider from '../context/MenuContext';
import AuthState from '../context/autenticacion/authState';

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
