import {useLoginContext} from './context';

const useUser = () => {
	const {user} = useLoginContext();
	return user;
};

export default useUser;
