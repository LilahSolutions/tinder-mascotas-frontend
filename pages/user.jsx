import {withAuth, useUser} from '../utils/auth';
import {ProfileTabNavigator} from '../components/TabNavigator';
import styles from '../styles/User.module.css';

function Profile() {
	const user = useUser();

	return (
		<main className={styles.container}>
			<h2 className="box">Mi perfil</h2>
			<img className={styles.photo} src={user.image} alt="Foto de perfil" />
			<div className={styles.dataContainer}>
				<h4>
					Nombre: <span>{user.name}</span>
				</h4>
				<h4>
					Apellido: <span>{user.lastName}</span>
				</h4>
				<h4>
					Correo electrónico: <span>{user.email}</span>
				</h4>
			</div>
		</main>
	);
}

const Component = withAuth(Profile);
Component.TabNavigator = ProfileTabNavigator;

export default Component;
