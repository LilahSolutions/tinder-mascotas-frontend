import Header from '../components/Header';
import Carousel, { CarouselItem } from '../components/Carousel/Carousel';
import styles from '../styles/Home.module.css';

const mockedPets = [
	{
		name: 'Fede',
		img: 'https://web.lilasolutions.com.ar/landing/images/lila-logo-white.svg',
		race: 'Pichichu',
		description: 'Siempre esta en constante movimiento y muerde solo si se enoja'
	},
	{
		name: 'Perrito',
		img: 'https://web.lilasolutions.com.ar/landing/images/lila-logo-white.svg',
		race: 'Pichichu',
		description: 'Siempre esta en constante movimiento y muerde solo si se enoja'
	},
	{
		name: 'Oscar',
		img: 'https://web.lilasolutions.com.ar/landing/images/lila-logo-white.svg',
		race: 'Pichichu',
		description: 'Siempre esta en constante movimiento y muerde solo si se enoja'
	},
	{
		name: 'Julio',
		img: 'https://web.lilasolutions.com.ar/landing/images/lila-logo-white.svg',
		race: 'Pichichu',
		description: 'Siempre esta en constante movimiento y muerde solo si se enoja'
	},
	{
		name: 'Cuchau',
		img: 'https://web.lilasolutions.com.ar/landing/images/lila-logo-white.svg',
		race: 'Pichichu',
		description: 'Siempre esta en constante movimiento y muerde solo si se enoja'
	},
	{
		name: 'Adrenalina',
		img: 'https://web.lilasolutions.com.ar/landing/images/lila-logo-white.svg',
		race: 'Pichichu',
		description: 'Siempre esta en constante movimiento y muerde solo si se enoja'
	},
]

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
