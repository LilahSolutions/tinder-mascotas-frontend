const fetchMatches = async (endpoint, method, payload = {}) => {
	try {
		const res = await fetch(`/api/matches/${endpoint}`, {
			headers: {'Content-Type': 'application/json'},
			method: method,
			mode: 'cors',
			body: method !== 'get' ? JSON.stringify(payload) : undefined,
		});

		if (res.status !== 200) throw new Error();
		const {data} = await res.json();
		if (data) return data; // Pets array.
		return true; // Create successful.
	} catch {
		return method === 'get' ? [] : false; // Something went wrong.
	}
};

const MatchServices = {
	create: (payload) => fetchMatches('/create', 'post', payload),
	getPossibleMatches: (petToken) => fetchMatches(`/${petToken}`, 'get'),
	getMyMatches: (petToken) => fetchMatches(`/${petToken}/my-matches`, 'get'),
};

/// create: true/false indicating success.
/// gets: petsArray / [].

export default MatchServices;
