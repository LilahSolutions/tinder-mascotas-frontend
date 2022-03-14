import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useLoginContext} from './context';
import {AuthServices} from '../../services/AuthServices';

// eslint-disable-next-line react/display-name
const withAuth = (Component) => (props) => {
	const {isLoggedIn, dispatch} = useLoginContext();
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const fetchUser = async (token) => {
			const {user, status} = await AuthServices.getUserByToken(token);
			if (status === 'success') dispatch({type: 'login', value: user});
			setLoading(false);
		};
		const sessionToken = sessionStorage.getItem('sessionToken');
		if (sessionToken) fetchUser(sessionToken);
		else setLoading(false);
	}, []);

	useEffect(() => {
		// Loading is true while we are trying to fetch the user from BE (if sessionToken was found on sessionStorage).
		if (!loading && !isLoggedIn) router.push('/home');
	}, [loading]);

	return isLoggedIn && !loading && <Component {...props} />;
};

export default withAuth;
