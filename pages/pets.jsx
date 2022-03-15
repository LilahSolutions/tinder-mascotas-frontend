import Link from 'next/link';
// import {withAuth, usePets} from '../utils/auth';
import Button from '../components/Button';
import {PetsTabNavigator} from '../components/TabNavigator';
import styles from '../styles/Pets.module.css';

const Pets = () => {
	// const pets = usePets();
	const pets = [
		{
			id: 1,
			name: 'Jaskier',
			gender: 'male',
			type: 'cat',
			photo: '/assets/cat-pic.jpg',
		},
		{
			id: 2,
			name: 'Jaskier',
			gender: 'male',
			type: 'cat',
			photo: '/assets/cat-pic.jpg',
		},
		{
			id: 3,
			name: 'Jaskier',
			gender: 'male',
			type: 'cat',
			photo: '/assets/cat-pic.jpg',
		},
	];

	const deletePet = (id) => {
		console.log('Goodbye, ', id);
	};

	return (
		<main className={styles.container}>
			<h2 className="box">Mis mascotas</h2>
			<Link href="/pet/add" passHref>
				<Button
					label="Agregar mascota"
					size="small"
					className={styles.addButton}
				/>
			</Link>
			<ul className={styles.petsList}>
				{pets.map((pet) => (
					<li key={pet.id} className={styles.petItem}>
						<img
							className={styles.photo}
							src={pet.photo}
							alt="Foto de mascota"
						/>
						<div>
							<h4>
								Nombre: <span>{pet.name}</span>
							</h4>
							<h4>
								Sexo: <span>{pet.gender}</span>
							</h4>
							<h4>
								Especie: <span>{pet.type}</span>
							</h4>
						</div>
						<div>
							<Link href={`/pets/${pet.id}`} passHref>
								<Button label="Ver" size="small" />
							</Link>
							<Link href="/pet/edit" passHref>
								<Button label="Modificar" size="small" />
							</Link>
							<Button
								label="Eliminar"
								size="small"
								handleClick={() => deletePet(pet.id)}
							/>
						</div>
					</li>
				))}
			</ul>
		</main>
	);
};

Pets.TabNavigator = PetsTabNavigator;

export default Pets;
// export default withAuth(Pets);
