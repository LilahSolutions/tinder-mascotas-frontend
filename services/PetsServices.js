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
		return {status: 'error', message: errorMessage, pet: {}};
	}
};

const PetsServices = {
	create: (payload) => fetchAuth('login', payload),
	update: (payload) => fetchAuth('login', payload),
	delete: (payload) => fetchAuth('login', payload),
	get: (payload) => fetchAuth('login', payload),
	getAll: (payload) => fetchAuth('login', payload),
};
// All CUD should trigger a new getAll. Get all sets the context.

export default PetsServices;
