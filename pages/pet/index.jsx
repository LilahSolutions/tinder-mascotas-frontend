import {withAuth, usePets, useUser} from '../../utils/auth';
import {PetsTabNavigator} from '../../components/TabNavigator';
import styles from '../../styles/Pets.module.css';

const Pets = () => {
	const user = useUser();
	const pets = usePets(); // Get the real pets from the BE.
	const pet = {
		name: 'Jaskier',
		gender: 'male',
		type: 'cat',
		photo: '/assets/cat-pic.jpg',
	};

	return (
		<main className={styles.container}>
			<img className={styles.mainPhoto} src={pet.photo} alt="Foto de mascota" />
			<h2 className={styles.name}>{pet.name}</h2>
			<p>
				Sexo: <span>{pet.gender}</span>
			</p>
			<p>
				Tipo: <span>{pet.type}</span>
			</p>
			<h2 className="box">Mascotas a las que les gusta {pet.name}</h2>
			<p className="box">¡Contacta a sus dueños por mail!</p>
			<ul className={styles.petsList}>
				{pets.map((pet) => (
					<li key={pet.id} className={styles.petItem}>
						<img
							className={styles.photo}
							src={pet.photo}
							alt="Foto de mascota"
						/>
						<div className={styles.dataContainer}>
							<h4>
								Nombre: <span>{pet.name}</span>
							</h4>
							<h4>
								Sexo: <span>{pet.gender}</span>
							</h4>
							<h4>
								Tipo: <span>{pet.type}</span>
							</h4>
							<h4>
								Mail del dueño: <span>{user.email}</span>
							</h4>
						</div>
					</li>
				))}
			</ul>
		</main>
	);
};

const Component = withAuth(Pets);
Component.TabNavigator = PetsTabNavigator;

export default Component;
