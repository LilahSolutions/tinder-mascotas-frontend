import styles from './Header.module.css';

const Header = ({showNav}) => (
	<header className={styles.container}>
		<img className={styles.img} src="/assets/logo.svg" alt="Logo" />
		<h1 className={styles.title}>Tinder</h1>
		{showNav && <h2 className={styles.title}>*A cool navbar*</h2>}
	</header>
);

export default Header;
