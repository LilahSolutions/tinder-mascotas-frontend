import {ProfileTabNavigator} from '../components/TabNavigator';
import styles from '../styles/Home.module.css';

function Home() {
	return <main className={styles.container}>Mi perfil</main>;
}

Home.TabNavigator = ProfileTabNavigator;

export default Home;
