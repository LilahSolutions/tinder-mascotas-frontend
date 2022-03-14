import Head from 'next/head';
import Header from '../components/Header';
import {LoginProvider} from '../utils/auth';
import '../styles/globals.css';

function MyApp({Component, pageProps}) {
	const TabNavigator = Component.TabNavigator;
	const isDesktop = globalThis.innerWidth > 720;

	// useEffect(() => {
	// globalThis.document.documentElement.addEventListener('resize', (e) => {
	// 	console.log(e.target.clientWidth);
	// })
	// })

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
			<Header showNav={isDesktop && TabNavigator} />
			<LoginProvider>
				<Component {...pageProps} />
			</LoginProvider>
			{!isDesktop && TabNavigator && <TabNavigator />}
		</>
	);
}

export default MyApp;
