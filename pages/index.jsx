import { useState } from 'react';
import Carousel, { CarouselItem } from '../components/Carousel/Carousel';
import MessageBar from '../components/MessageBar/MessageBar';
import { MatchTabNavigator } from '../components/TabNavigator';
import styles from '../styles/Home.module.css';
import { mockedPets, myMockedPets } from '../services/constants';
import PetSelector from '../components/PetSelector/PetSelector';
import MatchButton from '../components/MatchButton';

function Home() {
	const [activePet, setActivePet] = useState(0);
	const [activeIndex, setActiveIndex] = useState(0);

	const likeHandler = () => {
		console.log('Le diste like a', mockedPets[activeIndex].name)
	}

	const username = 'Eren';
	return (
		<main className={styles.container}>
			<MessageBar message={`¡Bienvenido, ${username}!`} />
			<Carousel
				activeIndex={activeIndex}
				setActiveIndex={setActiveIndex}
			>
				{mockedPets.map(
					(pet, index) => 
					<CarouselItem 
						key={index}
						{...pet}
					/>)
				}
			</Carousel>
			<MatchButton handler={likeHandler} />
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
