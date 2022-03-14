import styles from './MessageBar.module.css'

const MessageBar = ({message}) => {
	return(
		<div className={styles.messageBar}>
			<span className={styles.message}>
			{message}
			</span>
		</div>
	)
}

export default MessageBar;