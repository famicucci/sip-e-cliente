import '../styles/globals.css';
import BarraHerramientasProvider from '../context/BarraHerramientasContext';
import MenuProvider from '../context/MenuContext';

function MyApp({ Component, pageProps }) {
	return (
		<MenuProvider>
			<BarraHerramientasProvider>
				<Component {...pageProps} />
			</BarraHerramientasProvider>
		</MenuProvider>
	);
}

export default MyApp;
