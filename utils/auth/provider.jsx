import {useReducer} from 'react';
import {useRouter} from 'next/router';
import {LoginContext} from './context';
import PetsServices from '../../services/PetsServices';
import AuthServices from '../../services/AuthServices';

const initialState = {isLoggedIn: false, user: null, pets: []};

const reducer = (state, action) => {
	switch (action.type) {
		case 'login':
			return {...state, isLoggedIn: true, user: action.value};
		case 'logout':
			return initialState;
		case 'update-pets':
			return {...state, pets: action.value};
		default:
			return state;
	}
};

const LoginProvider = ({children}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const router = useRouter();

	const updatePets = async () => {
		const pets = await PetsServices.getAll();
		dispatch({type: 'update-pets', value: pets});
	};

	const login = async (data) => {
		const {status, message, user} = await AuthServices.login(data);
		if (status === 'error') return message;
		dispatch({type: 'login', value: user});
		await updatePets();
		router.replace('/');
	};

	const logout = async () => {
		dispatch({type: 'logout'});
		sessionStorage.removeItem('sessionToken');
		router.replace('/home');
	};

	const register = async (data) => {
		const {status, message} = await AuthServices.register(data);
		if (status === 'success') {
			const {email, password} = data;
			await login({email, password});
		} else return message;
	};

	return (
		<LoginContext.Provider
			value={{...state, login, logout, updatePets, register}}
		>
			{children}
		</LoginContext.Provider>
	);
};

export default LoginProvider;
