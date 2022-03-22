import Link from 'next/link';
import styles from '../styles/Landing.module.css';

const Landing = () => {
	return (
		<main className={styles.container}>
			<div className={styles.titlesContainer}>
				<h2 className="box">¡Bienvenido a Tinder de Mascotas!</h2>
				<h3 className={styles.subtitle}>
					Acá podés encontrarle pareja a tu mejor amigo y hacerlo muy feliz
				</h3>
				<div className={styles.buttonsContainer}>
					<Link href="/login" passHref>
						<a className="box">INGRESAR</a>
					</Link>
					<img
						className={styles.icon}
						src="/assets/icon-heart-paw.svg"
						alt="Icono"
					/>
					<Link href="/register">
						<a className="box">REGISTRARSE</a>
					</Link>
				</div>
			</div>
			<img
				className={styles.photo}
				src="/assets/cat-pic.jpg"
				alt="Mascota feliz"
			/>
		</main>
	);
};

export default Landing;
