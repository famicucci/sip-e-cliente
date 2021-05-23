import '../styles/globals.css';
import MenuProvider from '../context/MenuContext';
import AuthState from '../context/autenticacion/authState';
import BarraHerramientas from '../context/barraHerramientas/barraHerramientasState';

function MyApp({ Component, pageProps }) {
	return (
		<AuthState>
			<MenuProvider>
				<BarraHerramientas>
					<Component {...pageProps} />
				</BarraHerramientas>
			</MenuProvider>
		</AuthState>
	);
}

export default MyApp;
