import styles from './WelcomeBar.module.css'

const WelcomeBar = ({username}) => {
	return(
		<div className={styles.welcomeBar}>
			<span className={styles.welcomeMsg}>
			{`¡Bienvenido, ${username}!`}
			</span>
		</div>
	)
}

export default WelcomeBar;