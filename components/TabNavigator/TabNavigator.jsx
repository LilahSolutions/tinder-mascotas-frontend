import Link from 'next/link';
import {TABS} from '../../services/constants';
import styles from './TabNavigator.module.css';

const TabNavigator = ({screen}) => (
	<nav className={styles.container}>
		{TABS.map(({key, route, title, img}) => (
			<Link key={key} href={route} passHref>
				<button className={styles.tab} disabled={screen === key}>
					<img className={styles.icon} src={`/assets/${img}`} alt={title} />
					{title}
				</button>
			</Link>
		))}
	</nav>
);

export default TabNavigator;
