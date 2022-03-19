import {useEffect, useReducer} from 'react';
import {LoginContext} from './context';
import PetsServices from '../../services/PetsServices';
import AuthServices from '../../services/AuthServices';

const mockUser = {
	name: 'Ro',
	lastName: 'Mena',
	email: 'r@lila.com',
	photo: '/assets/cat-pic.jpg',
};
const pets = [
	{
		id: 1,
		name: 'Jaskier',
		gender: 'male',
		type: 'cat',
		photo: '/assets/cat-pic.jpg',
	},
	{
		id: 2,
		name: 'Jaskier',
		gender: 'male',
		type: 'cat',
		photo: '/assets/cat-pic.jpg',
	},
	{
		id: 3,
		name: 'Jaskier',
		gender: 'male',
		type: 'cat',
		photo: '/assets/cat-pic.jpg',
	},
];

const initialState = {isLoggedIn: true, user: mockUser, pets: pets}; ///
// const initialState = {isLoggedIn: false, user: null, pets: null };

const reducer = (state, action) => {
	switch (action.type) {
		case 'login':
			return {...state, isLoggedIn: true, user: action.value};
		case 'update-pets':
			return {...state, pets: action.value};
		default:
			return state;
	}
};

const LoginProvider = ({children}) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const login = async (data) => {
		const {status, message, user} = await AuthServices.login(data);
		if (status === 'error') return message;
		dispatch({type: 'login', value: user});
		router.replace('/');
	};

	const register = async (data) => {
		const {status, message} = await AuthServices.register(data);
		if (status === 'success')
			await login({user: data.user, password: user.password});
		else return message;
	};

	const updatePets = async () => {
		const pets = await PetsServices.getAll(state.user.token);
		dispatch('update-pets', pets);
	};

	useEffect(() => {
		if (state.isLoggedIn) {
			updatePets();
		}
	}, [state.isLoggedIn]);

	return (
		<LoginContext.Provider value={{...state, login, updatePets, register}}>
			{children}
		</LoginContext.Provider>
	);
};

export default LoginProvider;
