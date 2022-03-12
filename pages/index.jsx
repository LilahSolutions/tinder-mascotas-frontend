import Carousel, { CarouselItem } from '../components/Carousel/Carousel';
import {MatchTabNavigator} from '../components/TabNavigator';
import styles from '../styles/Home.module.css';
import { mockedPets } from '../services/constants';

function Home() {
	return (
		<main className={styles.container}>
			<Carousel>
				{mockedPets.map(
					(pet, index) => 
					<CarouselItem 
						key={index}
						{...pet}
					/>)
				}
			</Carousel>
		</main>
	);
}

Home.TabNavigator = MatchTabNavigator;

export default Home;
