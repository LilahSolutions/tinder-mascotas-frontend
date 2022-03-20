const fetchAuth = async (endpoint, payload) => {
	try {
		const res = await fetch(`/api/auth/${endpoint}`, {
			headers: {'Content-Type': 'application/json'},
			method: 'post',
			mode: 'cors',
			body: JSON.stringify(payload),
		});
		const data = await res.json();
		if (res.status !== 200) throw new Error('MESSAGE:' + data.error);
		const {user} = data;
		sessionStorage.setItem('sessionToken', user?.token);
		return {status: 'success', message: '', user};
	} catch (error) {
		const errorMessage = error.message.startsWith('MESSAGE:')
			? error.message.slice(8) // error.message is a pretty string describing the error.
			: 'Ha ocurrido un error';
		return {status: 'error', message: errorMessage, user: null};
	}
};

const AuthServices = {
	login: (payload) => fetchAuth('login', payload),
	register: (payload) => fetchAuth('register', payload),
};

export default AuthServices;
