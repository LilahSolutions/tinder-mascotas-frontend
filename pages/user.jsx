// import {withAuth, useUser} from '../utils/auth';
import {ProfileTabNavigator} from '../components/TabNavigator';
import styles from '../styles/User.module.css';

function Profile() {
	// const user = useUser();
	const user = {
		name: 'Ro',
		lastname: 'Mena',
		email: 'r@lila.com',
		photo: '/assets/cat-pic.jpg',
	};

	return (
		<main className={styles.container}>
			<h2 className="box">Mi perfil</h2>
			<img className={styles.photo} src={user.photo} alt="Foto de perfil" />
			<div className={styles.dataContainer}>
				<h4>
					Nombre: <span>{user.name}</span>
				</h4>
				<h4>
					Apellido: <span>{user.lastname}</span>
				</h4>
				<h4>
					Correo electrónico: <span>{user.email}</span>
				</h4>
			</div>
		</main>
	);
}

Profile.TabNavigator = ProfileTabNavigator;

export default Profile;
// export default withAuth(Profile);
