import PropTypes from 'prop-types';

const Input = ({handleChange, ...props}) => {
	return <input onChange={handleChange} {...props} />;
};

Input.propTypes = {
	handleChange: PropTypes.func.isRequired,
};

export default Input;
