import {useReducer} from 'react';
import {LoginContext} from './context';

const mockUser = {
	name: 'Ro',
	lastname: 'Mena',
	email: 'r@lila.com',
	photo: '/assets/cat-pic.jpg',
	pets: [
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
	],
};

const initialState = {isLoggedIn: true, user: mockUser}; ///
// const initialState = {isLoggedIn: false, user: null };

const reducer = (state, action) => {
	switch (action.type) {
		case 'login':
			return {...state, isLoggedIn: true, user: action.value};
		case 'logout':
			return {isLoggedIn: false, user: null, establishment: null};
		default:
			return state;
	}
};

const LoginProvider = ({children}) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<LoginContext.Provider value={{...state, dispatch}}>
			{children}
		</LoginContext.Provider>
	);
};

export default LoginProvider;
