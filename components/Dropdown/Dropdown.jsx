import styles from './Dropdown.module.css'

const Dropdown = ({handleChange, options, defaultValue, size, className, ...props}) => {
	return (
		<select className={[styles.dropdown, styles[size], className].join(' ')} value={defaultValue} {...props} onChange={handleChange}>
			{options.map((opt, index) => <option value={opt} key={index}>{opt}</option>)}
		</select>
	)
}

export default Dropdown