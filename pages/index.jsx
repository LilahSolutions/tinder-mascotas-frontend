import {useState} from 'react';
import {useUser, withAuth} from '../utils/auth';
import Carousel, {
	CarouselItem,
	NoCarousel,
} from '../components/Carousel/Carousel';
import MessageBar from '../components/MessageBar/MessageBar';
import {MatchTabNavigator} from '../components/TabNavigator';
import styles from '../styles/Home.module.css';
import {
	mockedPets as matchedPets,
	myMockedPets as myPets,
} from '../services/constants';
import PetSelector from '../components/PetSelector/PetSelector';
import MatchButton from '../components/MatchButton';

function Home() {
	const user = useUser();
	const [activePet, setActivePet] = useState(0);
	const [activeIndex, setActiveIndex] = useState(0);

	const likeHandler = () => {
		console.log('Le diste like a', matchedPets[activeIndex].name);
	};

	return (
		<main className={styles.container}>
			<MessageBar message={`¡Bienvenido, ${user.name}!`} />
			{!!matchedPets.length && (
				<Carousel activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
					{matchedPets.map((pet, index) => (
						<CarouselItem key={index} {...pet} />
					))}
				</Carousel>
			)}
			{!!matchedPets.length && <MatchButton handler={likeHandler} />}
			{!matchedPets.length && !!myPets.length && (
				<NoCarousel messageId="no_matches" />
			)}
			{!myPets.length && <NoCarousel messageId="no_pets" />}
			<PetSelector
				pets={myPets}
				activePet={activePet}
				setActivePet={setActivePet}
			/>
		</main>
	);
}

const Component = withAuth(Home);
Component.TabNavigator = MatchTabNavigator;

export default Component;
