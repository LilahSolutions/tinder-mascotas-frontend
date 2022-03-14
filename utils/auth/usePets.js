import {useLoginContext} from './context';

const usePets = () => {
	const {user} = useLoginContext();
	return user.pets;
};

export default usePets;
