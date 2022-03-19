import Link from 'next/link';
import {withAuth, useLoginContext} from '../utils/auth';
import Button from '../components/Button';
import {PetsTabNavigator} from '../components/TabNavigator';
import styles from '../styles/Pets.module.css';
import PetsServices from '../services/PetsServices';

const Pets = () => {
	const {pets, updatePets} = useLoginContext();

	const deletePet = async (token) => {
		const success = await PetsServices.delete(token);
		if (success) await updatePets();
		else alert('¡Oops! Hubo un error y no pudimos eliminar esta mascota.');
	};

	return (
		<main className={styles.container}>
			<h2 className="box">Mis mascotas</h2>
			<ul className={styles.petsList}>
				<li className={styles.addButton}>
					<Link href="/pet/add" passHref>
						<Button label="Agregar mascota" size="small" />
					</Link>
				</li>
				{pets.map((pet) => (
					<li key={pet.token} className={styles.petItem}>
						<img
							className={styles.photo}
							src={pet.image}
							alt="Foto de mascota"
						/>
						<div className={styles.dataContainer}>
							<h4>
								Nombre: <span>{pet.name}</span>
							</h4>
							<h4>
								Sexo: <span>{pet.sex}</span>
							</h4>
							<h4>
								Especie: <span>{pet.type}</span>
							</h4>
						</div>
						<div className={styles.buttonsContainer}>
							<Link href={`/pet?id=${pet.token}`} passHref>
								<Button label="Ver" size="small" />
							</Link>
							<Link href="/pet/edit" passHref>
								<Button label="Modificar" size="small" />
							</Link>
							<Button
								label="Eliminar"
								size="small"
								handleClick={() => deletePet(pet.token)}
							/>
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
