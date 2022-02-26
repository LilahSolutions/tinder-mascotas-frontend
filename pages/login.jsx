import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Button from '../components/Button';
import Input from '../components/Input';
import AuthServices, {useLoginContext} from '/services/AuthServices';
import styles from '../styles/Login.module.css';

const Login = () => {
	const [form, setForm] = useState({user: '', password: ''});
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const {dispatch} = useLoginContext();
	const router = useRouter();

	useEffect(() => {
		router.prefetch('/establishment');
	}, []);

	const handleChange = (e) => {
		const {name, value} = e.target;
		setForm((prevForm) => ({...prevForm, [name]: value}));
	};

	const handleLogin = async () => {
		setLoading(true);
		const {status, message, user} = await AuthServices.login(form);
		if (status === 'error') setError(message);
		else if (status === 'success') {
			setError('');
			dispatch({type: 'login', value: user});
			router.replace('/establishment');
		}
		setLoading(false);
	};

	return (
		<main className={styles.main}>
			<img
				src="/assets/urbi-logotipo.svg"
				className={styles.logo}
				alt="Urbi Logo"
			/>
			<div className={styles.inputsContainer}>
				<h2>Iniciar sesión</h2>
				{error && <p className={styles.error}>{error}</p>}
				<Input
					className={styles.input}
					placeholder="Usuario"
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
			</div>
			<Button
				disabled={loading}
				label="Entrar"
				handleClick={handleLogin}
				size="large"
			/>
		</main>
	);
};

export default Login;
