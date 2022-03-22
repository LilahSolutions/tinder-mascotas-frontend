import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useLoginContext} from './context';

const withAuth = (Component) =>
	function AuthWrapper(props) {
		const {isLoggedIn} = useLoginContext();
		const router = useRouter();

		useEffect(() => {
			if (!isLoggedIn) router.push('/home');
		}, []);

		return isLoggedIn && <Component {...props} />;
	};

export default withAuth;
