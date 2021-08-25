import '../styles/globals.css';
import MenuProvider from '../context/MenuContext';
import AuthState from '../context/autenticacion/authState';
import BarraHerramientas from '../context/barraHerramientas/barraHerramientasState';
import ClientesState from '../context/clientes/clientesState';
import VentasState from '../context/ventas/ventasState';
import EditarOrdenesState from '../context/ventas/editarordenes/EditarOrdenesState';
import GlobalDataState from '../context/globalData/globalDataState';

function MyApp({ Component, pageProps }) {
	return (
		<AuthState>
			<GlobalDataState>
				<MenuProvider>
					<BarraHerramientas>
						<VentasState>
							<EditarOrdenesState>
								<ClientesState>
									<Component {...pageProps} />
								</ClientesState>
							</EditarOrdenesState>
						</VentasState>
					</BarraHerramientas>
				</MenuProvider>
			</GlobalDataState>
		</AuthState>
	);
}

export default MyApp;
