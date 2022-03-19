import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {withAuth, usePets} from '../../utils/auth';
import MatchServices from '../../services/MatchesServices';
import styles from '../../styles/Pet.module.css';

const Pet = ({token}) => {
	const [matchers, setMatchers] = useState([]);
	const router = useRouter();
	const myPets = usePets();
	const pet = myPets.find((pet) => pet.token === token) || {};

	useEffect(() => {
		const fetchMatchers = async () => {
			const matchers = await MatchServices.getMyMatches(token);
			setMatchers(matchers);
		};

		if (!Object.keys(pet).length) router.replace('/pets');
		else fetchMatchers();
	}, []);

	return (
		<main className={styles.container}>
			<img className={styles.mainPhoto} src={pet.image} alt="Foto de mascota" />
			<h2 className={styles.name}>{pet.name}</h2>
			<div className={styles.petData}>
				<h4>
					Sexo: <span>{pet.sex}</span>
				</h4>
				<h4>
					Tipo: <span>{pet.type}</span>
				</h4>
			</div>
			<h2 className="box">Mascotas a las que les gusta {pet.name}</h2>
			<p className="box">¡Contacta a sus dueños por mail!</p>
			<ul className={styles.petsList}>
				{matchers.map((pet) => (
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
								Tipo: <span>{pet.type}</span>
							</h4>
							<h4>
								Mail del dueño: <span>{pet.email}</span>
							</h4>
						</div>
					</li>
				))}
			</ul>
		</main>
	);
};

export async function getServerSideProps({query}) {
	const {id} = query;
	return {props: {token: id}};
}

const Component = withAuth(Pet);
Component.goBack = '/pets';

export default Component;
