import {MatchTabNavigator} from '../components/TabNavigator';
import styles from '../styles/Home.module.css';

function Home() {
	return <main className={styles.container}>Hola</main>;
}

Home.TabNavigator = MatchTabNavigator;

export default Home;
