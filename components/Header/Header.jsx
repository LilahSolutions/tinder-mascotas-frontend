import Link from 'next/link';
import {TABS} from '../../services/constants';
import styles from './Header.module.css';

const Header = ({showNav}) => (
	<header className={styles.container}>
		<img className={styles.img} src="/assets/logo.svg" alt="Logo" />
		<h1 className={styles.title}>Tinder {showNav && 'de mascotas'}</h1>
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
