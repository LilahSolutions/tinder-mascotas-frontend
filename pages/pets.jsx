import {PetsTabNavigator} from '../components/TabNavigator';
import styles from '../styles/Home.module.css';

function Home() {
	return <main className={styles.container}>Mascotas</main>;
}

Home.TabNavigator = PetsTabNavigator;

export default Home;
