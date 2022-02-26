import Head from 'next/head';
import '../styles/globals.css';

function MyApp({Component, pageProps}) {
	return (
		<>
			<Head>
				<title>Choco-tinder</title>
				<meta
					name="description"
					content="Chocotinder: encontrale pareja a tu mascota"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
