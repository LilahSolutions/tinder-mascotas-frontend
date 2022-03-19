import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useLoginContext} from '../utils/auth';
import Button from '../components/Button';
import Input from '../components/Input';
import styles from '../styles/Login.module.css';

const Login = () => {
	const [form, setForm] = useState({user: '', password: ''});
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const {login} = useLoginContext();
	const router = useRouter();

	useEffect(() => {
		router.prefetch('/');
	}, []);

	const handleChange = (e) => {
		const {name, value} = e.target;
		setForm((prevForm) => ({...prevForm, [name]: value}));
	};

	const handleLogin = async () => {
		setLoading(true);
		const error = await login(form);
		setError(error ? error : '');
		setLoading(false);
	};

	return (
		<main className={styles.main}>
			<h2 className={styles.title}>Iniciar Sesión</h2>
			{error && <p className={styles.error}>{error}</p>}
			<Input
				className={styles.input}
				placeholder="Email"
				name="user"
				value={form.user}
				handleChange={handleChange}
			/>
			<Input
				className={styles.input}
				placeholder="Contraseña"
				name="password"
				type="password"
				value={form.password}
				handleChange={handleChange}
			/>
			<Button
				disabled={loading}
				label="Ingresar"
				handleClick={handleLogin}
				size="large"
			/>
		</main>
	);
};

export default Login;
