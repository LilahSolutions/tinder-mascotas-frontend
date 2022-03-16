import PropTypes from 'prop-types';
import styles from './Input.module.css'

const Input = ({handleChange, ...props}) => {
	return <input className={[styles.button, styles[props.size]].join(' ')} onChange={handleChange} {...props} />;
};

Input.propTypes = {
	handleChange: PropTypes.func.isRequired,
};

export default Input;
