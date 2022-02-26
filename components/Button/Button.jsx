import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({handleClick, label, size, primary, className, disabled, isLoading, ...props}) => {
	return (
		<button
			className={[styles.button, styles[size], styles[primary? "primary":"secondary"], className].join(' ')}
			onClick={handleClick}
			disabled={isLoading || disabled} 
			{...props}
			>
			{isLoading ? <span className={styles.loading}></span> : label} 
		</button>
	);
};

Button.propTypes = {
	handleClick: PropTypes.func.isRequired,
	label: PropTypes.string,
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	className: PropTypes.string,
	primary: PropTypes.bool,
	isLoading: PropTypes.bool,
	disabled: PropTypes.bool,
};

Button.defaultProps = {
	className: '',
	label: '',
	size: 'medium',
	primary: true,
	disabled: false,
	isLoading: false,
}

export default Button;
