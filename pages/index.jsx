import { useState } from 'react';
import Carousel, { CarouselItem } from '../components/Carousel/Carousel';
import MessageBar from '../components/MessageBar/MessageBar';
import { MatchTabNavigator } from '../components/TabNavigator';
import styles from '../styles/Home.module.css';
import { mockedPets, myMockedPets } from '../services/constants';
import PetSelector from '../components/PetSelector/PetSelector';

function Home() {
	const [activePet, setActivePet] = useState(0);
	const username = 'Eren';
	return (
		<main className={styles.container}>
			<MessageBar message={`¡Bienvenido, ${username}!`} />
			<Carousel>
				{mockedPets.map(
					(pet, index) => 
					<CarouselItem 
						key={index}
						{...pet}
					/>)
				}
			</Carousel>
			<PetSelector 
				pets={myMockedPets} 
				activePet={activePet} 
				setActivePet={setActivePet} 
			/>
		</main>
	);
}

Home.TabNavigator = MatchTabNavigator;

export default Home;
