import styles from './MatchButton.module.css';

const MatchButton = ({handler}) => {
	return (
		<div className={styles.buttonContainer} onClick={() => handler()}>
			<img
				className={styles.buttonImage}
				src="/assets/match-img.png"
				alt="match button"
			/>
		</div>
	);
};

export default MatchButton;
