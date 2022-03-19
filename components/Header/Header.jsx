import Link from 'next/link';
import {TABS} from '../../services/constants';
import styles from './Header.module.css';

const Header = ({showNav, goBack}) => (
	<header className={styles.container}>
		{goBack && (
			<Link href={goBack} passHref>
				<img
					className={styles.goBackButton}
					src="/assets/arrow-back.svg"
					alt="Volver"
				/>
			</Link>
		)}
		<Link href="/" passHref>
			<img className={styles.img} src="/assets/logo.svg" alt="Logo" />
		</Link>
		<Link href="/" passHref>
			<h1 className={styles.title}>
				Tinder <span className={styles.desktop}> de mascotas</span>
			</h1>
		</Link>
		{showNav && (
			<nav className={styles.nav}>
				{TABS.map(({key, route, title}) => (
					<Link key={key} href={route} passHref>
						<a className={styles.link}>{title}</a>
					</Link>
				))}
			</nav>
		)}
	</header>
);

export default Header;
