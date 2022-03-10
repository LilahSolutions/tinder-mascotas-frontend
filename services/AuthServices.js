const fetchAuth = async (url, payload = {}, method = 'get') => {
	try {
		const res = await fetch(url, {
			headers: {'Content-Type': 'application/json'},
			method: method,
			mode: 'cors',
			body: JSON.stringify(payload),
		});
		const data = await res.json();
		if (res.status !== 200) throw new Error('MESSAGE:' + data.error);
		sessionStorage.setItem('sessionToken', data.token);
		return {status: 'success', message: '', user: data};
	} catch (error) {
		const errorMessage = error.message.startsWith('MESSAGE:')
			? error.message.slice(8) // error.message is a pretty string describing the error.
			: 'Ha ocurrido un error';
		return {status: 'error', message: errorMessage, user: {}};
	}
};

const AuthServices = {
	login: (payload) => fetchAuth('/api/auth/login', payload, 'post'),
	signin: (payload) => fetchAuth('/api/auth/signin', payload, 'post'),
	getUserByToken: (token) => fetchAuth(`/api/auth?token=${token}`),
};

export default AuthServices;

export const useLoginContext = () => ({dispatch: () => {}});
