import '../styles/globals.css';
import MenuProvider from '../context/MenuContext';
import AuthState from '../context/autenticacion/authState';
import BarraHerramientas from '../context/barraHerramientas/barraHerramientasState';
import ClientesState from '../context/clientes/clientesState';
import VentasState from '../context/ventas/ventasState';

function MyApp({ Component, pageProps }) {
	return (
		<AuthState>
			<MenuProvider>
				<BarraHerramientas>
					<VentasState>
						<ClientesState>
							<Component {...pageProps} />
						</ClientesState>
					</VentasState>
				</BarraHerramientas>
			</MenuProvider>
		</AuthState>
	);
}

export default MyApp;
