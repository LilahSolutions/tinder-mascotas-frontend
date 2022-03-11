import styles from './Carousel.module.css'
import React, {useState} from 'react'
import { useSwipeable } from 'react-swipeable'

export const CarouselItem = ({width, transform, name, img, race, description}) => {
	return (
		<div className={styles.carouselItem} style={{width, transform, transition: 'transform .3s'}}>
			<h2 className={styles.itemName}>{name}</h2>
			<img className={styles.itemImg} src={img} alt={name}/>
			<div className={styles.itemDescriptionCtn}>
				{race && <span>{`Raza: ${race}`}</span>}
				{
				description && 
				<div className={styles.itemDescription}>
					<span>
						{`Dato curioso sobre ${name}: `}
					</span>
					<span>{description}</span>
				</div>
				}
			</div>
		</div>
	)
}

const Carousel = ({children}) => {
	const [activeIndex, setActiveIndex] = useState(0);

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
		onSwipedRight: () => updateIndex(activeIndex - 1)
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