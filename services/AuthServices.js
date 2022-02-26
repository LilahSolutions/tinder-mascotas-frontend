const AuthServices = {
	login: async (payload) => {
		const url = '/api/auth';
		try {
			const res = await fetch(url, {
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
	},
	getUserByToken: async (token) => {
		const url = `/api/auth?token=${token}`;
		try {
			const res = await fetch(url);
			if (res.status !== 200) throw new Error(res.statusText);
			const user = await res.json();
			return {status: 'success', user: user};
		} catch {
			return {status: 'error', user: {}};
		}
	},
};

export default AuthServices;

export const useLoginContext = () => ({dispatch: () => {}});
