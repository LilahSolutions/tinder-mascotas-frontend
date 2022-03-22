import {useLoginContext} from './context';

const usePets = () => {
	const {pets} = useLoginContext();
	return pets;
};

export default usePets;
