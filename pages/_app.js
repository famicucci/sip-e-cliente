import '../styles/globals.css';
import MenuProvider from '../context/MenuContext';
import AuthState from '../context/autenticacion/authState';
import BarraHerramientas from '../context/barraHerramientas/barraHerramientasState';
import ClientesState from '../context/clientes/clientesState';

function MyApp({ Component, pageProps }) {
	return (
		<AuthState>
			<MenuProvider>
				<BarraHerramientas>
					<ClientesState>
						<Component {...pageProps} />
					</ClientesState>
				</BarraHerramientas>
			</MenuProvider>
		</AuthState>
	);
}

export default MyApp;
