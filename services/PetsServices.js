const fetchPets = async (endpoint, method, payload = {}) => {
	try {
		const res = await fetch(`/api/pets${endpoint}`, {
			headers: {'Content-Type': 'application/json'},
			method: method,
			mode: 'cors',
			body: method !== 'get' ? JSON.stringify(payload) : undefined,
		});
		if (res.status !== 200) throw new Error();
		const {data} = await res.json();
		if (data !== undefined) return data || []; // Pet or pets array.
		return true; // CRUD successful.
	} catch {
		return method === 'get' ? [] : false; // Something went wrong.
	}
};

const getUserToken = () => sessionStorage.getItem('sessionToken');

const PetsServices = {
	getAll: () => fetchPets(`/owner/${getUserToken()}`, 'get'),
	get: (petToken) => fetchPets(`/${petToken}`, 'get'),
	create: (payload) => fetchPets(`/owner/${getUserToken()}`, 'post', payload),
	update: (petToken, payload) => fetchPets(`/${petToken}`, 'put', payload),
	delete: (petToken) => fetchPets(`/${petToken}`, 'delete'),
};

export default PetsServices;
