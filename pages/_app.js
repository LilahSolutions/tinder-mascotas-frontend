import {useState, useEffect} from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import {LoginProvider} from '../utils/auth';
import '../styles/globals.css';

function MyApp({Component, pageProps}) {
	const TabNavigator = Component.TabNavigator;
	const goBackRoute = Component.goBack;
	const [isDesktop, setIsDesktop] = useState(globalThis.innerWidth > 720);

	useEffect(() => {
		const updateNavBar = () => setIsDesktop(!!(window.innerWidth > 720));
		if (window) {
			window.addEventListener('resize', updateNavBar);
			return () => window.removeEventListener('resize', updateNavBar);
		}
	}, []);

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
			<Header showNav={isDesktop && TabNavigator} goBack={goBackRoute} />
			<LoginProvider>
				<Component {...pageProps} />
			</LoginProvider>
			{!isDesktop && TabNavigator && <TabNavigator />}
		</>
	);
}

export default MyApp;
