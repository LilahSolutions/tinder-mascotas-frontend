import {useRouter} from 'next/router';
import styles from './TabNavigator.module.css';

const tabs = [
	{key: 'pets', route: '/pets', img: 'icon-pets.svg', title: 'mascotas'},
	{key: 'match', route: '/', img: 'icon-match.svg', title: 'parejas'},
	{key: 'profile', route: '/user', img: 'icon-user.svg', title: 'perfil'},
];

const TabNavigator = ({screen}) => {
	const router = useRouter();

	const handleClick = (route) => () => {
		router.push(route);
	};

	return (
		<nav className={styles.container}>
			{tabs.map(({key, route, title, img}) => (
				<button
					key={key}
					className={styles.tab}
					disabled={screen === key}
					onClick={handleClick(route)}
				>
					<img className={styles.icon} src={`/assets/${img}`} alt={title} />
					{title}
				</button>
			))}
		</nav>
	);
};

export default TabNavigator;
