import '../styles/globals.css';
import BarraHerramientasProvider from '../context/BarraHerramientasContext';

function MyApp({ Component, pageProps }) {
	return (
		<BarraHerramientasProvider>
			<Component {...pageProps} />
		</BarraHerramientasProvider>
	);
}

export default MyApp;
