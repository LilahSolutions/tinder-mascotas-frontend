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
		sessionStorage.setItem('sessionToken', data.token);
		return {status: 'success', message: '', user: data};
	} catch (error) {
		const errorMessage = error.message.startsWith('MESSAGE:')
			? error.message.slice(8) // error.message is a pretty string describing the error.
			: 'Ha ocurrido un error';
		return {status: 'error', message: errorMessage, user: {}};
	}
};

const MatchServices = {
	create: (payload) => fetchAuth('login', payload),
	getPossibleMatches: (payload) => fetchAuth('login', payload),
	getMyMatches: (payload) => fetchAuth('login', payload),
};
/// All of these return values directly
export default MatchServices;
