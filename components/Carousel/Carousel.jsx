import styles from './Carousel.module.css';
import React from 'react';
import Link from 'next/link';
import {useSwipeable} from 'react-swipeable';
import classNames from '../../utils/classNames';
import {MESSAGE_IDS} from '../../services/config';

export const CarouselItem = ({width, transform, name, image, description}) => {
	return (
		<div
			className={classNames(styles.carouselItem, styles.card)}
			style={{width, transform, transition: 'transform .3s'}}
		>
			<h2 className={styles.itemName}>{name}</h2>
			<img
				className={styles.itemImg}
				src={
					image ||
					'https://web.lilasolutions.com.ar/landing/images/lila-logo-white.svg'
				}
				alt={name}
			/>
			<div className={styles.itemDescriptionCtn}>
				{description && (
					<div className={styles.itemDescription}>
						<span className={styles.descriptionTitle}>
							{`Dato curioso sobre ${name}: `}
						</span>
						<span>{description}</span>
					</div>
				)}
			</div>
		</div>
	);
};

export const NoCarousel = ({messageId}) => {
	return (
		<div className={classNames(styles.noCarousel, styles.card)}>
			<h2 className={styles.itemName}>{MESSAGE_IDS[messageId]}</h2>
			<img src="/assets/sad-dog.png" alt="sad pet" />
			{messageId === 'no_pets' && (
				<Link href="/pet/add" passHref>
					<span className={classNames(styles.descriptionTitle, styles.link)}>
						Agregar mascotas
					</span>
				</Link>
			)}
		</div>
	);
};

const Carousel = ({children, activeIndex, setActiveIndex}) => {
	const {innerWidth: width} = typeof window !== 'undefined' ? window : {};

	const updateIndex = (newIndex) => {
		if (newIndex < 0) {
			newIndex = 0;
		} else if (newIndex >= React.Children.count(children)) {
			newIndex = React.Children.count(children) - 1;
		}

		setActiveIndex(newIndex);
	};

	const swipeHandlers = useSwipeable({
		onSwipedLeft: () => updateIndex(activeIndex + 1),
		onSwipedRight: () => updateIndex(activeIndex - 1),
	});

	const translateValue = width < 720 ? 70 : 30;

	return (
		<div className={styles.carousel} {...swipeHandlers}>
			<div
				className={styles.carouselInner}
				style={{transform: `translate(${-activeIndex * translateValue}%)`}}
			>
				{/* Should always use this method instead of maps to traverse React children */}
				{React.Children.map(children, (child, index) =>
					React.cloneElement(child, {
						transform: `scale(${index === activeIndex ? '1' : '0.9'})`,
					})
				)}
			</div>
			<div className={styles.carouselArrowsContainer}>
				<span
					className={classNames(styles.carouselArrow, styles.arrowLeft)}
					onClick={() => updateIndex(activeIndex - 1)}
				>
					<img src="/assets/chevron-left.svg" alt="left arrow" />
				</span>
				<span
					className={classNames(styles.carouselArrow, styles.arrowRight)}
					onClick={() => updateIndex(activeIndex + 1)}
				>
					<img src="/assets/chevron-right.svg" alt="right arrow" />
				</span>
			</div>
		</div>
	);
};

export default Carousel;
