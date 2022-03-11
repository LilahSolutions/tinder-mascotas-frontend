import Carousel, { CarouselItem } from '../components/Carousel/Carousel';
import styles from '../styles/Home.module.css';
import { mockedPets } from '../services/constants';

export default function Home() {
	return (
		<div className={styles.container}>
			<Carousel>
				{mockedPets.map(
					(pet, index) => 
					<CarouselItem 
						key={index}
						{...pet}
					/>)
				}
			</Carousel>
		</div>
	);
}
