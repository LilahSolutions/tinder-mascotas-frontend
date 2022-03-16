import styles from './Carousel.module.css'
import React from 'react'
import Link from 'next/link';
import { useSwipeable } from 'react-swipeable'
import classNames from '../../utils/classNames'
import { MESSAGE_IDS } from '../../services/config'

export const CarouselItem = ({width, transform, name, img, race, description}) => {
	return (
		<div className={classNames(styles.carouselItem, styles.card)} style={{width, transform, transition: 'transform .3s'}}>
			<h2 className={styles.itemName}>{name}</h2>
			<img className={styles.itemImg} src={img} alt={name}/>
			<div className={styles.itemDescriptionCtn}>
				{
					race &&
					<div>
						<span className={styles.descriptionTitle}>Raza: </span>
						<span>{race}</span>
					</div>
				}
				{
					description && 
					<div className={styles.itemDescription}>
						<span className={styles.descriptionTitle}>
							{`Dato curioso sobre ${name}: `}
						</span>
						<span>{description}</span>
					</div>
				}
			</div>
		</div>
	)
}

export const NoCarousel = ({ messageId }) => {
	return(
		<div className={classNames(styles.noCarousel, styles.card)}>
			<h2 className={styles.itemName}>
				{MESSAGE_IDS[messageId]}
			</h2>
			<img src='/assets/sad-dog.png' alt='sad pet' />
			{
				messageId === 'no_pets' &&
				<Link href='/pet/add' passHref>
					<span className={classNames(styles.descriptionTitle, styles.link)}>Agregar mascotas</span>
				</Link>
			}
		</div>
	)
}

const Carousel = ({children, activeIndex, setActiveIndex}) => {

	const updateIndex = (newIndex) => {
		if(newIndex < 0){
			newIndex = 0
		}else if(newIndex >= React.Children.count(children)){
			newIndex = React.Children.count(children)-1
		}

		setActiveIndex(newIndex)
	}

	const swipeHandlers = useSwipeable({
		onSwipedLeft: () => updateIndex(activeIndex + 1),
		onSwipedRight: () => updateIndex(activeIndex - 1),
	})

	return (
		<div className={styles.carousel} {...swipeHandlers}>
			<div className={styles.carouselInner} style={{transform: `translate(${-activeIndex*70}%)`}}>
				{/* Should always use this method instead of maps to traverse React children */}
				{React.Children.map(children, (child, index) => 
					React.cloneElement(
						child, 
						{
							width: '60%', 
							transform: `scale(${index === activeIndex ? '1' : '0.9'})`,
						}
					)
				)}
			</div>
		</div>
	)
}

export default Carousel;