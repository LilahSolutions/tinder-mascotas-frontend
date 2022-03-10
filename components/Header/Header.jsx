import styles from './Header.module.css';

const Header = () => (
	<header className={styles.container}>
		<img className={styles.img} src="/assets/logo.svg" alt="Logo" />
		<h1 className={styles.title}>Tinder</h1>
	</header>
);

export default Header;
